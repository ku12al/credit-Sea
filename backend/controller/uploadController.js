const xml2js = require("xml2js");
const Creadit = require("../model/Creadit");


exports.uploadFile = async (req, res) => {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const xmlData = req.file.buffer.toString();
    const parser = new xml2js.Parser({ explicitArray: false });

    try {
        const result = await parser.parseStringPromise(xmlData);

        // Ensure paths exist before accessing them
        const applicant = result?.INProfileResponse?.Current_Application?.Current_Application_Details?.Current_Applicant_Details;
        const scoreData = result?.INProfileResponse?.SCORE;
        const caisDetails = result?.INProfileResponse?.CAIS_Account?.CAIS_Account_DETAILS;
        const capsSummary = result?.INProfileResponse?.TotalCAPS_Summary;

        if (!applicant || !scoreData || !caisDetails || !capsSummary) {
            return res.status(400).json({ error: "Invalid XML structure" });
        }

        const extractedData = {
            name: `${applicant.First_Name || ""} ${applicant.Last_Name || ""}`.trim(),
            mobile: applicant.MobilePhoneNumber || "N/A",
            pan: caisDetails?.CAIS_Holder_Details?.Income_TAX_PAN || "N/A",
            creditScore: parseInt(scoreData.BureauScore || "0", 10),

            reportSummary: {
                totalAccounts: parseInt(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountTotal || "0", 10),
                activeAccounts: parseInt(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountActive || "0", 10),
                closedAccounts: parseInt(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountClosed || "0", 10),
                currentBalance: parseFloat(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_All || "0"),
                securedAmount: parseFloat(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_Secured || "0"),
                unsecuredAmount: parseFloat(result?.INProfileResponse?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured || "0"),
                last7DaysEnquiries: parseInt(capsSummary?.TotalCAPSLast7Days || "0", 10)
            },

            creditAccounts: Array.isArray(caisDetails) ? caisDetails.map(account => ({
                bank: account.Subscriber_Name?.trim() || "Unknown Bank",
                accountNumber: account.Account_Number || "N/A",
                currentBalance: parseFloat(account.Current_Balance || "0"),
                amountOverdue: parseFloat(account.Amount_Past_Due || "0"),
                creditLimit: parseFloat(account.Credit_Limit_Amount || "0"),
                accountStatus: account.Account_Status || "Unknown"
            })) : []
        };

        const newReport = new Creadit(extractedData);
        await newReport.save();

        res.json({ message: "File processed successfully", reportId: newReport._id });
  
    } catch (error) {
        console.error("XML Parsing Error:", error);
        res.status(500).json({ error: "Error processing file" });
    }
};

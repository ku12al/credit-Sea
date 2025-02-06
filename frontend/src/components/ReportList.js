import axios from "axios";
import React, { useEffect, useState } from "react";

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReports();
  }, []);
  return (
    <div>
      <h2>Credit Reports</h2>
      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        reports.map((report, index) => (
          <div key={index} className="report-card">
            <h3>{report.name}</h3>
            <p>
              <strong>Mobile:</strong> {report.mobile}
            </p>
            <p>
              <strong>PAN:</strong> {report.pan}
            </p>
            <p>
              <strong>Credit Score:</strong> {report.creditScore}
            </p>
            <h4>Report Summary</h4>
            <ul>
              <li>Total Accounts: {report.reportSummary.totalAccounts}</li>
              <li>Active Accounts: {report.reportSummary.activeAccounts}</li>
              <li>Closed Accounts: {report.reportSummary.closedAccounts}</li>
              <li>Current Balance: ₹{report.reportSummary.currentBalance}</li>
              <li>Secured Balance: ₹{report.reportSummary.securedAmount}</li>
              <li>
                UnSecured Balance: ₹{report.reportSummary.unsecuredAmount}
              </li>
              <li>
                Last 7 days payment Enquiry:{" "}
                {report.reportSummary.last7DaysEnquiries}
              </li>
            </ul>
            <br />
            <h4>Credit Account</h4>
            <ul>
              {report.creditAccounts.map((account, i) => (
                <li key={i}>
                  <strong>Bank:</strong> {account.bank} <br />
                  <strong>Account Number:</strong> {account.accountNumber}{" "}
                  <br />
                  <strong>Current Balance:</strong> ₹{account.currentBalance}{" "}
                  <br />
                  <strong>Amount Overdue:</strong> ₹{account.amountOverdue}{" "}
                  <br />
                  <strong>Credit Limit:</strong> ₹{account.creditLimit} <br />
                  <strong>Account Status:</strong> {account.accountStatus}
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportList;

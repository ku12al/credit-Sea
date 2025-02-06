const Creadit = require("../model/Creadit");


exports.getReport = async (req, res) => {
    try {
        const reports = await Creadit.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Error fetching reports" });
    }
};

import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
                  <p><strong>Mobile:</strong> {report.mobile}</p>
                  <p><strong>PAN:</strong> {report.pan}</p>
                  <p><strong>Credit Score:</strong> {report.creditScore}</p>
                  <h4>Report Summary</h4>
                  <ul>
                      <li>Total Accounts: {report.reportSummary.totalAccounts}</li>
                      <li>Active Accounts: {report.reportSummary.activeAccounts}</li>
                      <li>Closed Accounts: {report.reportSummary.closedAccounts}</li>
                      <li>Current Balance: ₹{report.reportSummary.currentBalance}</li>
                  </ul>
              </div>
          ))
      )}
  </div>
  )
}

export default ReportList
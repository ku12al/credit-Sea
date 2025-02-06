import axios from "axios";
import React, { useEffect, useState } from "react";
import "../stylesheet/ReportList.css";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); 
  const [filteredReports, setFilteredReports] = useState([]); 

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reports");
        setReports(response.data);
        setFilteredReports(response.data); 
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReports();
  }, []);
  
  const handleUserChange = (event) => {
    const selected = event.target.value;
    setSelectedUser(selected);

   
    if (selected === "") {
      setFilteredReports(reports); 
    } else {
      const filtered = reports.filter((report) => report.name === selected);
      setFilteredReports(filtered); 
    }
  };
  return (
    <div className="report-container">
      <h2 className="report-title">Credit Reports</h2>
      
      
      <div className="user-select">
        <label htmlFor="user-dropdown">Select User: </label>
        <select
          id="user-dropdown"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">All Users</option>
          {reports.map((report, index) => (
            <option key={index} value={report.name}>
              {report.name}
            </option>
          ))}
        </select>
      </div>

      {filteredReports.length === 0 ? (
        <p className="no-reports">No reports available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>PAN</th>
                <th>Credit Score</th>
                <th>Total Accounts</th>
                <th>Active Accounts</th>
                <th>Closed Accounts</th>
                <th>Current Balance</th>
                <th>Secured Balance</th>
                <th>Unsecured Balance</th>
                <th>Last 7 Days Enquiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{report.name}</td>
                    <td>{report.mobile}</td>
                    <td>{report.pan}</td>
                    <td className="center">{report.creditScore}</td>
                    <td className="center">{report.reportSummary.totalAccounts}</td>
                    <td className="center">{report.reportSummary.activeAccounts}</td>
                    <td className="center">{report.reportSummary.closedAccounts}</td>
                    <td className="balance">₹{report.reportSummary.currentBalance}</td>
                    <td className="balance">₹{report.reportSummary.securedAmount}</td>
                    <td className="balance" style={{ color: 'red' }}>₹{report.reportSummary.unsecuredAmount}</td>
                    <td className="center">{report.reportSummary.last7DaysEnquiries}</td>
                    <td>
                      <a href={`tel:${report.mobile}`} className="call-button">
                        Call
                      </a>
                    </td>
                  </tr>
                  {report.creditAccounts.length > 0 && (
                    <tr>
                      <td colSpan={12}>
                        <div className="credit-account-section">
                          <h4>Credit Accounts</h4>
                          <table className="nested-table">
                            <thead>
                              <tr>
                                <th>Bank</th>
                                <th>Account Number</th>
                                <th>Current Balance</th>
                                <th>Amount Overdue</th>
                                <th>Credit Limit</th>
                                <th>Account Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {report.creditAccounts.map((account, i) => (
                                <tr key={i}>
                                  <td>{account.bank}</td>
                                  <td>{account.accountNumber}</td>
                                  <td className="balance">₹{account.currentBalance}</td>
                                  <td className="balance" style={{ color: 'red' }}>₹{account.amountOverdue}</td>
                                  <td className="balance">₹{account.creditLimit}</td>
                                  <td className="center">{account.accountStatus}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportList;

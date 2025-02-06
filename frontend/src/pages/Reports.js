import React from "react";
import ReportList from "../components/ReportList.js";
import { Link } from "react-router-dom";
import "../stylesheet/Report.css";  

const Reports = () => {
  return (
    <div className="reports-container">
      <h1 className="heading">Credit Report Data</h1>
      <ReportList />
      <Link to="/">
        <button className="back-home-btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default Reports;

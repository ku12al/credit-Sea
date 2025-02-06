import React from "react";
import UploadFile from "../components/UploadFile.js";
import { Link } from "react-router-dom";
import "../stylesheet/Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="heading">CreditSea - XML Processing</h1>
      <UploadFile />
      <Link to="/reports">
        <button className="view-reports-btn">View Reports</button>
      </Link>
    </div>
  );
};

export default Home;

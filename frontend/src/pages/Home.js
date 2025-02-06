import React from "react";
import UploadFile from "../components/UploadFile.js";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl">CreditSea - XML Processing</h1>
      <UploadFile />
      <Link to="/reports">
        <button>View Reports</button>
      </Link>
    </div>
  );
};

export default Home;

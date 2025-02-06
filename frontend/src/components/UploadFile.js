import React, { useState } from "react";
import axios from "axios";
import "../stylesheet/UploadFile.css";  

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-xml-file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Upload successful!");
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload XML File</h2>
      <div className="input-container">
        <input type="file" onChange={handleFileChange} />
      </div>
      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadFile;

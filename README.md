I have tried to collect data from xml file 
# 🚀 Credit Report XML Processor (MERN Stack)

This project processes **Experian Soft Credit Pull XML Files**, extracts key details, stores them in **MongoDB**, and serves the data via a REST API.

---

## 📜 Features
✅ Upload XML file via REST API  
✅ Extract personal & credit report details  
✅ Store data in MongoDB  
✅ Retrieve structured report data via API  
✅ Error handling for missing data  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Parsing:** `xml2js` (Convert XML → JSON)  
- **Middleware:** `multer` (File Upload)  

---

## 🚀 Installation & Setup

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/yourusername/creditsea-xml-parser.git
cd creditsea-xml-parser

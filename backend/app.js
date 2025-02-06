const express = require('express');
const cors = require("cors");
const connectDB = require('./db/database');
const dotenv = require('dotenv');
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const upload = require("./routes/uploadRoute")
const report = require("./routes/reportRoute")

app.use("/api", upload)
app.use("/api", report)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
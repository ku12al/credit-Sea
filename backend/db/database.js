const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();


const connectDB = async () => {
      try {
          await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
          console.log("MongoDB Connected");
      } catch (error) {
          console.error("MongoDB Connection Failed", error);
          process.exit(1);
      }
  };

module.exports = connectDB;
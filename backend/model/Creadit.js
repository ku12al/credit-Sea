const mongoose = require("mongoose");

const creaditSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  pan: {
    type: String,
    required: true,
  },
  creaditScore: {
    type: String,
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [
    {
      creditCard: String,
      bank: String,
      address: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
    },
  ],
});

const creadit = mongoose.model("Creadit", creaditSchema);
module.exports =creadit
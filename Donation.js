const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: String,
  donationAmount: Number,
  // paymentMethod: String,
  // upiID: String,
  donationMessage: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Donation", donationSchema);

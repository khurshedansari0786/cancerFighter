const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// MongoDB Connection

mongoose.connect("mongodb://127.0.0.1:27017/suportSystem")
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Models registered:", mongoose.modelNames()); // 👈 Check this
  })
  .catch(err => console.error("MongoDB Error:", err));

// Models
const Register = require("./models/Register");
const Contact = require("./models/Contact");
const Donation = require("./models/Donation");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    console.log("Received Register Data:", req.body); //show data in console
    const { name, email, password } = req.body;
    await Register.create({ name, email, password });
    res.redirect("/submitted.html");
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send("Registration Failed");
  }
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  try {
    console.log("Received Contact Data:", req.body); // show data in console
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.redirect("/submitted.html");
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).send("Contact Submission Failed");
  }
});


// Donation Route

app.post("/api/donation", async (req, res) => {
  try {
    console.log("Received Donation Data:", req.body); // show data in console          

    const { donorName, donationAmount,  donationMessage } = req.body;

    await Donation.create({ donorName, donationAmount,  donationMessage });

   res.status(200).json({ success: true });
 // Or use  res.status(200).json({ message: "Success" });    paymentMethod, upiID,
  } catch (err) {
    console.error("Donation Error:", err);
    res.status(500).send("Donation Failed");
  }
});


app.get("/test-register", async (req, res) => {
  try {
    await Register.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456"
    });
    res.send("✅ Test User Registered in MongoDB");
  } catch (err) {
    console.error("❌ Test Register Error:", err);
    res.status(500).send("❌ Test Failed");
  }
});

app.post("/api/test", (req, res) => {
  console.log("📥 Received Data:", req.body);
  res.json({
    message: "✅ Data received successfully",
    received: req.body
  });
});



// Server Listen
app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`);
});

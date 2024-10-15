const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/AdminModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Admin.findOne({ username: username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Add User Manually (For Initial Setup)
router.post("/adduser", async (req, res) => {
  try {
    const { username, password } = req.body; // Get username and password from the request body
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      username: username,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Food = require("../structure/detail");
const User = require("../structure/user");
const AsyncStorage = require("@react-native-async-storage/async-storage");
const jwt = require("jsonwebtoken");
const e = require("express");
//Authentication routes
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, address, phoneNumber, password, userType } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      address,
      phoneNumber,
      password: hashedPassword,
      userType,
    });

    // Save the user to MongoDB
    await user.save();

    // Registration successful
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);

    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if chef exists
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  // Check password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid login credentials" });
  }

  // Create and send JWT token
  let token = jwt.sign({ _id: user._id, email: email }, "PrivateKey");
  // const token = { email: email };

  return res.send({ message: "Logged in successfully", token });
});

module.exports = router;

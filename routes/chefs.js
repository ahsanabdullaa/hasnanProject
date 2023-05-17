const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Food = require("../structure/detail");
const User = require("../structure/user");
const AsyncStorage = require("@react-native-async-storage/async-storage");

router.get("/", async (req, res) => {
  //fetch all food and send
  try {
    //await for async return
    const chef = await Chef.find();
    //send in json format.. .send will send in text form
    res.json(chef);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

module.exports = router;

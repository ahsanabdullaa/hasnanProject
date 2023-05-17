const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Food = require("../structure/detail");
const User = require("../structure/user");
const AsyncStorage = require("@react-native-async-storage/async-storage");
const auth = require("../middlewares/auth");

//async will not lock process
//get all records
router.get("/", auth, async (req, res) => {
  //fetch all food and send
  try {
    //await for async return
    const food = await Food.find({ userId: req.user._id });
    //send in json format.. .send will send in text form
    res.json(food);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

//get single record
router.get("/:id", async (req, res) => {
  //fetch one food item and send
  try {
    //await for async return
    const food = await Food.findById(req.params.id);
    //send in json format.. .send will send in text form
    res.json(food);
    console.log("Get Request by ID Worked");
  } catch (err) {
    res.send("Error: " + err);
    console.log("didnt work");
  }
});

//insert data in database
router.post("/", auth, async function (req, res, next) {
  console.log(req.user);
  let food = new Food();
  food.name = req.body.name;
  food.price = req.body.price;
  food.description = req.body.description;
  food.userId = req.user._id;
  await food.save();
  res.send(food);
});

//update/patch a record
router.patch("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  food.name = req.body.name;
  food.price = req.body.price;
  food.description = req.body.description;

  food.save((err) => {
    if (err) {
      res.send(err);
      console.log("Can't update data: " + err);
    } else {
      //display in json format
      res.json(food);
      console.log("Data Updated");
    }
  });
});

//delete a record
router.delete("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  food.remove((err) => {
    if (err) {
      res.send(err);
      console.log("Can't delete record: " + err);
    } else {
      //display in json format
      res.json("Record Deleted");
      console.log("Record Deleted");
    }
  });
});

// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     // Check if chef already exists
//     const existingChef = await Chef.findOne({ email });
//     if (existingChef) {
//       return res.status(400).json({ message: 'Chef already exists' });
//     }
//     // Encrypt password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new chef
//     const chef = new Chef({
//       username,
//       email,
//       password:hashedPassword,
//     });

//     // Save chef to database
//     await chef.save();

//     const storeUserIdentifier = async (identifier) => {
//         try {
//           await AsyncStorage.setItem('chefId', identifier);
//           console.log('User identifier stored successfully.');
//         } catch (error) {
//           console.log('Error storing user identifier:', error);
//         }
//       };

//     res.status(201).json({ message: 'Chef registered successfully' });

//     const chefId = chefId;
//     storeUserIdentifier(chefId);

//   });

//export module router
//it will be accesible in app.js
module.exports = router;

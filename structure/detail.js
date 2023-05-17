//handle only one record
//schema for database

const mongoose = require("mongoose");

const foodDetail = new mongoose.Schema({
  userId: String,
  name: {
    //properties
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

//export schema
module.exports = mongoose.model("Food", foodDetail);

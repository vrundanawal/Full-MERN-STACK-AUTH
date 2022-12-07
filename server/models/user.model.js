const mongoose = require("mongoose");

//create a user schema
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: "user-data" }
);

//create a model
const model = mongoose.model("UserData", User);

module.exports = model;

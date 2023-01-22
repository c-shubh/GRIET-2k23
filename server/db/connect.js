const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URL, { useNewUrlParser: true });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;

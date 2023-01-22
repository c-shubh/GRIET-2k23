const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URL, { useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }
  const db = mongoose.connection;
  db.on("error", (err) => console.error(err));
  db.on("open", () => console.log("Connected to database"));
};
module.exports = connectDB;

require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", require("./routes/apiRoutes.js"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

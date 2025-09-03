const express = require("express");
const connectDB = require("./db");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, async () => {
  await connectDB;
  console.log("MongoDB connected");
  console.log("Server is running on port 3000");
});

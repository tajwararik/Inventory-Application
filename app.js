const express = require("express");
const path = require("node:path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Connected on port: ${PORT}`);
});

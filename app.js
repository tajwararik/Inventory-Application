const express = require("express");
const path = require("node:path");
const instrumentsRoutes = require("./routes/instrumentsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const brandsRoutes = require("./routes/brandsRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/instruments", instrumentsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/brands", brandsRoutes);

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`Connected on port: ${PORT}`);
});

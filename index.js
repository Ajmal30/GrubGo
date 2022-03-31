require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const DB = require("./DB");
const admin_auth = require("./projects/admin/Auth");
const admin_users = require("./projects/admin/Users");
const admin_foodCategory = require("./projects/admin/FoodCategory");
const admin_foodItems = require("./projects/admin/FoodItems");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ************************************************************
// CODE STARTS
// ************************************************************
DB.initializeDB();

app.use("/admin/auth", admin_auth);
app.use("/admin/users", admin_users);
app.use("/admin/food-category", admin_foodCategory);
app.use("/admin/food-items", admin_foodItems);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});
// ************************************************************
// CODE ENDS
// ************************************************************

app.listen(PORT, (e) => {
  if (e) throw e;

  console.log(`Server is listening at port ${PORT}`);
});

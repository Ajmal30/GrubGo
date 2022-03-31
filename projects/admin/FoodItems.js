const express = require("express");
const Router = express.Router();
const Food = require("../../schemas/Foods");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");

// add a food item
Router
	.route("/add").post([IsAuthenticated], async (req, res) => {
		if (req.user.role !== "admin") {
			res.status(401).json({
				message: "Unauthorized access!",
			});
		}
		const { 
			name, 
			category, 
			unitPrice, 
			currencyCode,
			currencySymbol,
			isAvailable
		} = req.body;
		const newFood = new Food({
			name,
			category,
			unitPrice,
			currencyCode,
			currencySymbol,
			isAvailable
		});
		await newFood.save();
		res.status(200).json({
			message: "OK",
			newFood: {
				name,
				category,
				unitPrice,
				currencyCode,
				currencySymbol,
				isAvailable
			}
		});
	});

// update a food item
Router
	.route("/update/:_id").put([IsAuthenticated], async (req, res) => {
		if (req.user.role !== "admin") {
		res.status(401).json({
		message: "Unauthorized acccess!",
		});
		}
		const { _id } = req.params;
		const { name, unitPrice, isAvailable, currencyCode, currencySymbol } = req.body;
		console.log(req.body, '----');
		const query = await Food.find({ _id });
		if (query) {
			try {
				const updatedFoodInfo = await Food.updateOne(
					{ _id: _id },
					{
					$set: {
							name,
							unitPrice,
							isAvailable,
							currencyCode,
							currencySymbol
						},
					}
				);
				const allFoods = await Food.find()
				res.status(200).json({
					message: "OK",
					allFoods,
				});
			} catch (e) {
				res.status(500).json({
				message: `${e}`,
				});
			}
		}
	});

// delete food item
Router
	.route("/delete/:_id").delete([IsAuthenticated], async (req, res) => {
		if (req.user.role !== "admin") {
			res.status(401).json({
				message: "Unauthorized acccess!",
			});
		}
		const { _id } = req.params;
		const query = await Food.find({ _id });
		if (query) {
			try {
				const deletedFoodItem = await Food.deleteOne({ _id: _id });
				res.status(200).json({
					message: "OK",
					deletedFoodItem,
				});
			} catch (e) {
				res.status(500).json({
					message: `${e}`,
				});
			}
		}
	});

// get food item by ID
Router.route("/get/:_id").get([IsAuthenticated], async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(401).json({
      message: "Unauthorized acccess!",
    });
  }
  const { _id } = req.params;
  const query = await Food.find({ _id });
  if (query) {
    try {
      const foodItemByID = await Food.find({ _id });
      res.status(200).json({
        message: "OK",
        foodItemByID,
      });
    } catch (e) {
      res.status(500).json({
        message: `${e}`,
      });
    }
  }
});

// get all food items
Router
	.route("/get-all").get([IsAuthenticated], async (req, res) => {
		if (req.user.role !== "admin") {
			res.status(401).json({
				message: "Unauthorized access!",
			});
		}
		const allFoodItems = await Food.find();
		res.status(200).json({
			message: "OK",
			allFoodItems,
		});
	});

module.exports = Router;

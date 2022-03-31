
// Read food category by id
const express = require("express");
const Router = express.Router();
const FoodCategory = require("../../schemas/FoodCategory");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");

Router .route("/get/:_id") .get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "staff") {
            res.status(401).json({
                message: "Unauthorized acccess!",
            });
        }
        const { _id } = req.params;
        const queryResult = await FoodCategory.find({ _id });
        if(queryResult) {
            res.status(200).json({
                message: "Ok",
                foodCategory: queryResult
            })
        } else {
            res.status(500).json({
                error: "Record not found"
            })
        }
    });

// read all food categories
Router
    .route("/get-all").get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "staff") {
            res.status(401).json({
                message: "Unauthorized access!",
            });
        }
        const allCategories = await FoodCategory.find();
        res.status(200).json({
            message: "OK",
            allCategories,
        });
    });

module.exports = Router;
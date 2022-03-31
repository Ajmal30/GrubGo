

// update food item (on or off)


// Read all foods
const express = require("express");
const Router = express.Router();
const FoodCategory = require("../../schemas/FoodCategory");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");

Router
    .route("/get-all").get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "staff") {
            res.status(401).json({
                message: "Unauthorized access!",
            });
        }
        const allFood = await Food.find();
        res.status(200).json({
            allFood,
        });
});

// Read one food by id

Router.route("/get/:_id").get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "staff") {
            res.status(401).json({
                message: "Unauthorized acccess!",
            });
        }
        const { _id } = req.params;
        const QueryResult = await Food.find({ _id });
        if(QueryResult) {
            res.status(200).json({
                foodCategory: QueryResult
            })
        } else {
            res.status(500).json({
                error: "Record not found"
            })
        }
    });

module.exports = Router;

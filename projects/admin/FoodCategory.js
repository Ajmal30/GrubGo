const express = require("express");
const Router = express.Router();
const FoodCategory = require("../../schemas/FoodCategory");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");

// add category
Router
    .route("/add")
    .post([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "admin") {
            res.status(401).json({
                message: "Unauthorized access!",
            });
        }
        const { title, properties } = req.body;
        const foodCategory = new FoodCategory({
            title,
            properties,
        });
        await foodCategory.save();
        res.status(200).json({
            message: "OK",
            title,
            properties,
        });
    });

//  update category
Router
    .route("/update/:_id")
    .put([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "admin") {
            res.status(401).json({
                message: "Unauthorized acccess!",
            });
        }
        const { _id } = req.params;
        const { newProperties, newTitle } = req.body;
        const queryResult = await FoodCategory.find({ _id });
        if (queryResult) {
            try {
                const updatedInfo = await FoodCategory.updateOne(
                    { _id: _id },
                    { $set: { title: newTitle, properties: newProperties } }
                );
                res.status(200).json({
                    message: "OK",
                    updatedInfo,
                });
            } catch (e) {
                res.status(500).json({
                message: `${e}`,
                });
            }
        }
    });

// delete category
Router
    .route("/delete/:_id")
    .delete([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "admin") {
            res.status(401).json({
                message: "Unauthorized acccess!",
            });
        }
        const { _id } = req.params;
        const queryResult = await FoodCategory.find({ _id });
        if (queryResult) {
            try {
            const deletedCategory = await FoodCategory.deleteOne({ _id: _id });
                res.status(200).json({
                    message: "OK",
                    deletedCategory,
                });
            } catch (e) {
                res.status(500).json({
                    message: `${e}`,
                });
            }
        }
    });

// read category by ID
Router
    .route("/get/:_id")
    .get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "admin") {
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

// read all categories
Router
    .route("/get-all").get([IsAuthenticated], async (req, res) => {
        if (req.user.role !== "admin") {
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
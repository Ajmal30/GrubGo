// get all food categories

// get food category by id

const express = require("express");
const Router = express.Router();
//const Food = require("../../schemas/Foods");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");
const { Route } = require("express");
const FoodCategory = require("../../schemas/FoodCategory");

Router.route("/get-all").get([IsAuthenticated],async (req,res) => {
    if(req.user.role!="customer"){
        req.status(401).json({
            message: "Unauthorized Access!",
        });
        const foodItems=await FoodCategory.find();
        res.status(200).json({
            foodItems,
        });
    }
});

Router.route("/get-all").get([IsAuthenticated],async (req,res) => {
    if(req.user.role!="customer"){
        req.status(401).json({
            message: "Unauhorized Access!",
        });

    }

    const {_id } = req.params;
    const query = await FoodCategory.find({ _id });
    if(query){
        try{
        const FoodCategoryById = await FoodCategory.find({ _id });
        res.status(200).json({
            message: "Ok",
            FoodCategoryById
        });
    } catch (e){
        res.status(500).json({
            message: `${e}`,
        });
    }
 }

});

module.exports = Router;
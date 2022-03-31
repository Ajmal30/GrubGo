

const express = require("express");
const Router = express.Router();
const Food = require("../../schemas/Foods");
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const req = require("express/lib/request");

// read all food items
Router.route("/get-all").get([IsAuthenticated], async(req,res) => {
  if(req.user.role!= "customer"){
      res.status(401).json({
          message: "Unauthroized Access"
      });
  }
  const FoodItems = await Food.find();
  res.status(200).json({
      FoodItems,

  });
});

// read food item by id
Router.route("/get/:_id").get([IsAuthenticated], async(req,res) => {
  if(req.user.role!="customer"){
      req.status(401).json({
          message: "Unauthroized Access"
      });

      const {_id } = req.params;
      const QResult = await Food.find({_id});
      if(QResult){
          res.status(200).json({
              Food: QResult
          })
      } else{
          res.status(500).json({
              error: "Record not found"
          })
      }

    }
});

// read food items by category
Router.route("/get/:_id").get([IsAuthenticated], async(req,res) => {
   if(req.user.role!="customer"){
       req.status(401).json({
           message: "Unauthorized Access"
       });
   }

   const { _food } = req.params;
        const queryResult = await FoodCategory.find({ _food });
        if(queryResult) {
            res.status(200).json({
                foodCategory: queryResult
            })
        } else {
            res.status(500).json({
                error: "Record not found"
            })
        }
});

module.exports = Router;
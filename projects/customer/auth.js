const express = require('express');
const Router = express.Router();
const User = require("../../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// sign in
Router.route("/sign-in").post(async (req,res) =>{
    const{
        username,
        password
    }=req.body;

    try{
        let user = await User.find({

        })
        if(!User.length){
            res.status(400).json({
                message: "User does not exist"
            })
            return;
        }
    

    user = user[0]


    const isPasswordCorrect = await bycrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        res.status(400).json({
            message: "Invalid Passowrd"
        })
        return;
    }

    const payload={
        user: {
            id: user.id
        }
    }
    jwt.sign(
        payload,
        process.env.ENCRYPTION_STRING,
        { expiresIn: 1000 },
        (err, token) => {
            if(err) throw err;

            res.status(200).json({
                user,
                token
            })
            return
        }
    );
  }
  catch(e){
      res.status(500).json({
          message: ' Error ' + e
      })
  }
})


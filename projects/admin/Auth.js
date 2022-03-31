const express = require('express');
const Router = express.Router();
const User = require("../../schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { IsAuthenticated } = require('../../middlewares/IsAuthenticated');
require('dotenv').config();

Router.route("/sign-up").post(async (req, res) => {
    const {
        username,
        password,
        email
    } = req.body;

    try {
        let user = await User.findOne({
            email
        })

        if(user) {
            res.status(400).json({
                message: 'User already exists'
            })
        }

        if(username === "" || username === null || username === undefined || username.length < 5) {
            res.status(400).json({
                message: "Username is invalid"
            })
        }

        if(email === "" || !email.includes('@') || !email.includes('.com')) {
            res.status(400).json({
                message: 'Invalid email'
            })
        }

        user = new User({
            username: username,
            email: email,
            password: password,
            role: 'admin'
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.ENCRYPTION_STRING,
            { expiresIn: 10000 },
            (err, token) => {
                if(err) throw err;

                console.log(token, ' is the token')
                res.status(200).json({
                    user,
                    token
                })
            }
        )
    } catch(e) {
        console.log("SignUp catch block: ", e);
        res.status(500).json({
            message: "Error while signing up!!!"
        })
    }
})

Router.route("/sign-in").post(async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        let user = await User.find({
            username
        })

        if(!user.length) {
            res.status(400).json({
                message: "User does not exist"
            })
            return;
        }

        user = user[0]

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            res.status(400).json({
                message: 'Invalid password'
            })
            return;
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.ENCRYPTION_STRING,
            { expiresIn: 10000 },
            (err, token) => {
                if(err) throw err;

                res.status(200).json({
                    user,
                    token
                })
                return;
            }
        );
    } catch(e) {
        res.status(500).json({
            message: 'Error: ' + e
        })
    }
})

Router.route("/update-password").post([
    IsAuthenticated
], async (req, res) => {
    if(req.user.role !== "admin") {
        res.status(401).json({
            message: 'Unauthorized Access'
        })
    }

    const {
        oldPWD,
        newPWD
    } = req.body;

    try {
        let user = await User.find({ username: req.user.username })

        if(!user.length) {
            console.log('user doesnt exist');
            res.status(400).json({
                message: 'User does not exist'
            })
        }

        user = user[0];
        const isPasswordCorrect = await bcrypt.compare(oldPWD, user.password);
        if(!isPasswordCorrect) {
            console.log('incrt pwd');
            res.status(400).json({
                message: 'Invalid Credentials'
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPWD, salt);
            await user.save();
            res.status(200).json({
                message: 'Password changed successfully...',
                newPwssword: newPWD
            })
        }


    } catch(e) {
        console.log('Error', e);
        res.status(500).json({
            message: e
        })
    }
})

module.exports = Router
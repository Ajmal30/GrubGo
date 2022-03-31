const express = require('express');
const Router = express.Router();
const User = require("../../schemas/User");
const {
    IsAuthenticated
} = require("../../middlewares/IsAuthenticated");

// CRUD on admins, staffs and customers
// Register customers by CSV

Router.route('/get-all-users').get([
    IsAuthenticated
], async (req, res) => {
    const usersList = await User.find();
    console.log(req.user.role)
    if(req.user.role !== 'admin') {
        res.status(401).json({
            message: 'Unauthorized Access'
        });
    }

    res.status(200).json({
        usersList: usersList,
        message: "OK..."
    })
})

Router.route('/register-customes').post([
    IsAuthenticated
], async (req, res) => {
    const user = req.user;
    const {
        usersRecords
    } = req.body;

    if(user.role !== "admin") {
        res.status(401).json({
            message: "Unauthorized access"
        })
    }

    usersRecords.forEach(user => {
        const actualRecord = user.split(",");
        console.log('actualRecord: ', actualRecord);
    })
})

module.exports = Router;
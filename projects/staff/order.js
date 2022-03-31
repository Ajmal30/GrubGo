const express = require('express');
const Router = express.Router();
const { IsAuthenticated } = require("../../middlewares/IsAuthenticated");
const Order = require("../../schemas/Order");

Router.route('/get-order-by-id').get([
    IsAuthenticated
], (req, res) => {
    const user = req.user;
    const {
        order_id
    } = req.body;

    if(user.role !== 'staff') {
        res.status(401).json({
            message: 'Only canteen staffs are allowed to access orders data'
        })
    } else {
        const order_details = await Order.findOne({
            order_id
        })
        res.status(200).json({
            order_details
        })
    }
})

// verify order
const express = require("express");
const Router = express.Router();
const {
    IsAuthenticated
} = require("../../middlewares/IsAuthenticated")
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RP_DEV_KEY_ID,
    key_secret: process.env.RP_DEV_KEY_SECRET,
})

// create order
Router.route('/create-order').post([
    IsAuthenticated
], async (req, res) => {
    const user = req.user;
    const {
        amount,
        currency
    } = req.body;

    if(user.role !== 'customer') {
        res.status(401).json({
            message: 'Only customers can place orders'
        })
    } else {
        const order = await razorpay.orders.create({
            amount,
            currency
        })

        res.status(200).json({
            order
        })
    }
})

// verify payment
Router.route('/verify-payment').post([
    IsAuthenticated
], (req, res) => {
    const user = req.user;
    const {
        orderID,
        transaction
    } = req.body;

    if(user.role !== "customer") {
        res.status(401).json({
            message: "Only customers can make payments"
        })
    } else {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RP_DEV_KEY_SECRET)
            .update(`${orderID}|${transaction.razorpay_payment_id}`)
            .digest("hex");

        res.status(200).json({
            message: "Payment verification complete...",
            isValidPayment: generatedSignature === transaction.razorpay_signature
        })
    }
})

// 

module.exports = Router;
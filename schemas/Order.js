// {
//     food_id: []<id-of-the-food-item-from-Foods>
//     order_id: <drder-id-from-razorpay>
//     success: <whether-success-or-not> (default is false)
//     razorpay_payment_id: <razorpay-payment-id>
//     user_id: <user-who-makes-this-order>
//     created_at: <created-at-timestamp>
//     last_updated: <timestamp>
//     paid: <boolean-whther-paid-or-not>
//     total_amount_to_pay: <integer-amount-sum-of-all-foodItems-in-bill>
// }

const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    food_id: [{
        type: String
    }],

    order_id: {
        type: String,
        required: true,
        unique: true
    },

    success: {
        type: Boolean,
        required: true,
        default: false
    },

    razorpay_payment_id: {
        type: String,
        required: true,
        unique: true
    },

    user_id: {
        type: String,
        required: true,
        unique: false
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },

    last_updated: {
        type: Date,
        required: true,
        default: Date.now
    },

    paid: {
        type: Boolean,
        required: true,
        default: false
    },

    total_amount_to_pay: {
        type: Number,
        required: true,
        default: 0
    },

    notes: {
        type: String,
        required: false,
        default: ''
    }
})

module.exports = mongoose.model('order', OrderSchema);
// {
//     username: <register-no>
//     email: <email>
//     password: <encrypted-password>
//     role: <role = admin || staff || student>
                // admin - all permission i.e. CRUD users, CRUD foodItems, CRUD foodCategory
                // staff - CRUD foodItems, CRUD foodCategory
                // customers - Read FoodItems, FoodCategory, Create || Read Orders
//     created_at: <timestamp>
//     last_updated: <timestamp>
// }

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'customer'],
        default: 'customer'
    },
});

module.exports = mongoose.model('user', UserSchema);
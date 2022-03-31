// {
//     title: <food-category-title>
//     properties: []<food-items-properties e.g. hot, cold, spicy, sweet>
//     created_at: <timestamp>
//     last_updated: <timestamp>
// }

const mongoose = require("mongoose");

const FoodCategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    properties: {
        type: [String],
        required: false,
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
    }
})

module.exports = mongoose.model('foodCategory', FoodCategorySchema);
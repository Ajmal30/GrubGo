// {
//     name: <food-item-name>
//     category: <food-item-category-from-category-schema>
//     unitPrice: <unit-price>
//     currencyCode: <currency-code i.e. INR, etc>
//     currencySymbol: <currency-symbol i.e. Rs, $, etc>
//     stockCount: <number-of-food-items-available>
//     created_at: <timestamp>
//     last_updated: <timestamp>
// }

const mongoose = require("mongoose");

const FoodsSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	// image: {
	//   type: Image,
	//   required: false,
	// },
	category: {
		type: [String],
		required: true,
	},
	unitPrice: {
		type: Number,
		required: true,
		default: 0,
	},
	currencyCode: {
		type: String,
		required: true,
		default: "INR",
	},
	currencySymbol: {
		type: String,
		required: true,
		default: "Rs",
	},
	isAvailable: {
		type: Boolean,
		required: true,
		default: false
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
	last_updated: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("foods", FoodsSchema);

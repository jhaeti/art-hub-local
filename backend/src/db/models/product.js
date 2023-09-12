const mongoose = require("mongoose");

// Creating Item Model
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		trim: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	ns: {
		type: Number,
		default: 0,
		alias: "numberSold",
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	img: {
		type: Buffer,
		required: true,
	},
	sellerName: { type: String, required: true },
	seller: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	isVerified: {
		type: Boolean,
		Default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

productSchema.methods.toJSON = function () {
	const product = this;

	const productObject = product.toObject();
	delete productObject.img;

	return productObject;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

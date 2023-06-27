const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: {
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
    amount: Number,
    paymentMethod: {
        type: String,
        default: "MTN momo",
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

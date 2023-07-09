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
  date: {
    type: Date,
    default: Date.now,
  },
});

productSchema.methods.toJSON = function () {
  const product = this;

  const userObject = product.toObject();
  //   userObject.img = "data:image/jpeg;base64," + userObject.img;

  return userObject;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

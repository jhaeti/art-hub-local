const express = require("express");

const Product = require("../db/models/product");
const artistAuth = require("./middleware/artistAuth");
const auth = require("./middleware/auth");

const router = express.Router();

const multer = require("multer");
const upload = multer({ limits: { fieldSize: 1000000 } });

// Get all products from database
// @return a [products]
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } });
    res.send(products);
  } catch (e) {
    res.sendStatus(500);
  }
});

// @Get product image
// returns an image
router.get("/products/:id/img", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });
    res.set("Content-Type", "image/jpg");
    res.send(product.img);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Post a product to /products
// Access Should be a user and an Artist
router.post(
  "/products",
  auth,
  artistAuth,
  upload.single("img"),
  async (req, res) => {
    if (!req.file || !req.file.buffer)
      return res.status(400).json("Please upload image");
    const newProduct = new Product({
      ...req.body,
      img: req.file.buffer,
      seller: req.user._id,
      sellerName: req.user.name,
    });

    try {
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (e) {
      res.sendStatus(500);
    }
  }
);

// Deleting product
// Access user and Artist who created that user
router.delete("/products/:_id", auth, artistAuth, async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findOneAndDelete({
      _id,
      seller: req.user._id,
    });
    // console.log(product);
    if (!product) {
      return res.sendStatus(400);
    }
    res.json(`Product with id: ${_id} is deleted successfully`);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Getting product by id
router.get("/products/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findById(_id);
    res.send(product);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Adding product to user favorite
router.put("/products/add-to-fav/:_id", auth, async (req, res) => {
  const { _id } = req.params;

  try {
    if (!req.user.favorites.includes(_id))
      req.user.favorites = [...req.user.favorites, _id];
    req.user.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
// Removing product to user favorite
router.put("/products/remove-from-fav/:_id", auth, async (req, res) => {
  const { _id } = req.params;

  try {
    if (req.user.favorites.includes(_id)) {
      console.log("Before: ", req.user.favorites);
      req.user.favorites = [...req.user.favorites].filter(
        (item) => _id !== item.toString()
      );
      console.log("After: ", req.user.favorites);
    }
    req.user.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

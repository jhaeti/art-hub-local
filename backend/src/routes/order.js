const Order = require("../db/models/order");
const Product = require("../db//models/product");
const router = require("express").Router();

const artistAuth = require("./middleware/artistAuth");
const auth = require("./middleware/auth");

// Router for making an order
router.post("/products/order", auth, async (req, res) => {
  try {
    const { amount, seller, productId, productName, price, quantity } =
      req.body;
    const product = await Product.findOne({ _id: productId });
    product.ns = product.ns + quantity;
    product.quantity = product.quantity - quantity;
    const productAfterSave = await product.save();
    const newOrder = new Order({
      amount,
      seller,
      productId,
      productName,
      price,
      quantity,
      buyer: req.user._id,
    });
    const order = productAfterSave && (await newOrder.save());
    res.json(order);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Getting user orders
router.get("/users/orders", auth, async (req, res) => {
  try {
    await req.user.populate("orders").execPopulate();
    res.json(req.user.orders);
  } catch (e) {
    res.sendStatus(500);
  }
});
// Getting user Sales
router.get("/user/sales", auth, artistAuth, async (req, res) => {
  try {
    await req.user.populate("sales").execPopulate();
    res.json(req.user.sales);
  } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = router;

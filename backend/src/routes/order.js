const Order = require("../db/models/order");
const router = require("express").Router();

const artistAuth = require("./middleware/artistAuth");
const auth = require("./middleware/auth");

router.post("/products/order", auth, async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, buyer: req.user._id });
    const order = await newOrder.save();
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

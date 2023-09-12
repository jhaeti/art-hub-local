const express = require("express");

const Product = require("../db/models/product");
const artistAuth = require("./middleware/artistAuth");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");
const adminOrArtistAuth = require("./middleware/adminOrArtistAuth");

const router = express.Router();

const multer = require("multer");
const upload = multer({ limits: { fieldSize: 1000000 } });

// Get all products from database
// @return a [products]
router.get("/products", async (req, res) => {
	try {
		const products = await Product.find({
			quantity: { $gt: 0 },
			isVerified: true,
		});
		res.send(products);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Getnumber of arts that are not yet approved
// @return a number
router.get("/products/pending/count", auth, adminAuth, async (req, res) => {
	try {
		const products = await Product.find({
			isVerified: false,
		});
		if (!products) {
			return res.json(0);
		}
		res.json(products.length);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Get number of arts that are not yet verified
// @return a [products]
router.get("/products/pending", auth, adminAuth, async (req, res) => {
	try {
		const products = await Product.find({
			isVerified: false,
		});
		res.send(products);
	} catch (e) {
		res.sendStatus(500);
	}
});
// Get number of arts that are yet verified
// @return a [products]
router.get("/products/approved/count", auth, adminAuth, async (req, res) => {
	try {
		const products = await Product.find({
			isVerified: true,
		});
		if (!products) {
			return res.json(0);
		}
		res.json(products.length);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Verifying a product with id
// @return a {products}
router.put("/products/verify/:id", auth, adminAuth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.json("Product not found");
		}

		product.isVerified = true;
		await product.save();
		res.json("Product successfully verified");
	} catch (e) {
		res.sendStatus(500);
	}
});

router.put("/products/disapprove/:id", auth, adminAuth, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.json("Product not found");
		}

		product.isVerified = false;
		await product.save();
		res.json("Product successfully disapproved");
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
			isVerified: false,
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
// Access admin and Artist who created that user
router.delete("/products/:_id", auth, adminOrArtistAuth, async (req, res) => {
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

// Getting pending product by id
router.get("/products/pending/:_id", auth, adminAuth, async (req, res) => {
	console.log("Got here");
	const { _id } = req.params;
	try {
		const product = await Product.findOne({ _id, isVerified: false });
		res.send(product);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Getting pending product by id
router.get("/products/approved/:_id", auth, adminAuth, async (req, res) => {
	const { _id } = req.params;
	try {
		const product = await Product.findOne({ _id, isVerified: true });
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

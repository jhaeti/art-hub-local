const express = require("express");
const auth = require("./middleware/auth");
const artistAuth = require("./middleware/artistAuth");
const adminAuth = require("./middleware/adminAuth");
const { setCookie, clearCookie } = require("../controllers/cookies");

const User = require("../db/models/user");

const router = express.Router();

// Geting user count
router.get("/users/count", auth, adminAuth, async (req, res) => {
	try {
		const userCount = await User.countDocuments();
		res.json(userCount);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Register Route
// @return { token, user}
router.post("/users/register", async (req, res) => {
	const { name, email, password, role, momo } = req.body;

	// Basic validation
	if (!name || !email || !password || !momo) {
		return res.status(400).json("Please enter all fields");
	}

	try {
		//   Check whether user already exist
		const previousUser = await User.findOne({ email });
		if (previousUser) {
			return res.status(400).json("Invalid Credentials");
		}

		// Create new User if user does not exist
		const newUser = new User({ ...req.body, token: [] });

		// Saving user with hash password into DataBase
		const user = await newUser.save();
		const token = await user.generateAuthToken();

		setCookie(res, process.env.AUTH_COOKIE_NAME, token);
		res.status(201).json({
			token,
			user,
		});
	} catch (e) {
		res.status(500).send();
	}
});

// Login Route
// @return { token, user}
router.post("/users/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by credentials
		const user = await User.findByCredentials(email, password);

		// Generate token for that user
		const token = await user.generateAuthToken();
		setCookie(res, process.env.AUTH_COOKIE_NAME, token);

		res.json({ token, user });
	} catch (e) {
		res.status(404).json(e.message);
	}
});

router.post("/users/admin/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by credentials
		const user = await User.findByAdminCredentials(email, password);

		// Generate token for that user
		const token = await user.generateAuthToken();
		setCookie(res, process.env.AUTH_COOKIE_NAME, token);

		res.json({ token, user });
	} catch (e) {
		res.status(404).json(e.message);
	}
});

// Getting user just from having correct cookies set
// @return { token, user}
router.get("/users/me", auth, (req, res) => {
	const { token, user } = req;
	res.json({ token, user });
});

// Delete self from the database
// @return {user}
router.delete("/users/me", auth, async (req, res) => {
	const user = await req.user.remove();
	clearCookie(res, process.env.AUTH_COOKIE_NAME);
	res.json({ user });
});

// Handling Logout functionality
// @return a status code 200
router.get("/users/logout", auth, async (req, res) => {
	const { user } = req;
	await user.removeToken(req.token);
	// Clear cookies from the browser
	clearCookie(res, process.env.AUTH_COOKIE_NAME);
	res.sendStatus(200);
});

// Delete any user by their id
// This is only accessible only by admins
router.delete("/users", auth, artistAuth, async (req, res) => {
	try {
		const id = req.body;
		const { deletedCount } = await User.deleteMany({ _id: { $in: id } });
		res.status(200).json(deletedCount);
	} catch (e) {
		res.sendStatus(500);
	}
});

// Getting user favorites
router.get("/users/my-favorites", auth, async (req, res) => {
	try {
		await req.user.populate("favorites").execPopulate();
		res.json(req.user.favorites);
	} catch (e) {
		res.sendStatus(500);
	}
});
// Getting products created by user
router.get("/users/my-products", auth, artistAuth, async (req, res) => {
	try {
		await req.user.populate("products").execPopulate();
		res.json(req.user.products);
	} catch (e) {
		res.sendStatus(500);
	}
});

module.exports = router;

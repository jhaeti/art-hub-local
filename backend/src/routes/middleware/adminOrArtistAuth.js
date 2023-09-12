const adminOrArtistAuth = (req, res, next) => {
	if (req.user.role !== ("ADMIN" | "ARTIST")) {
		return res.sendStatus(403);
	}
	next();
};

module.exports = adminOrArtistAuth;

const artistAuth = (req, res, next) => {
    if (req.user.role !== "ARTIST") {
        return res.sendStatus(403);
    }
    next();
};

module.exports = artistAuth;

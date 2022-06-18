const isLoggedIn = async (req, res, next) => {
    if (req.cookies.accessToken) console.log(req.user);
    // req.user ? next() : res.sendStatus(401);
};

module.exports = isLoggedIn;

const isLoggedIn = async (req, res, next) => {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
};

module.exports = isLoggedIn;

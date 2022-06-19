const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        console.log("cookies : ", req.cookies);
        const decode = jwt.verify(req.cookies.accessToken, process.env.JWT_TOKEN_SECRET);
        console.log(decode.id);
        req.user = decode.id;
        next();
    } catch (err) {
        console.log("Maybe token is expired, try again : " + err);
        res.redirect("/");
    }
};

module.exports = isLoggedIn;

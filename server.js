const express = require("express");
const mongoose = require("mongoose");
const userData = require("./Model/userData");
const apiRoutes = require("./Routes/Api/apiRoutes");
const passport = require("passport");
const googleAuth = require("./Routes/Auth/googleAuth");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

// PORT Connectivity
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRoutes);

// Google auth
app.use("/", googleAuth);

app.use(passport.initialize());
app.use(passport.session());

// connection with mongoose
mongoose
    .connect("mongodb://localhost/blogPlatform")
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("Database connection failed : ", err));

app.get("/", async (req, res) => {
    // console.log("req.user is : ", req.user);
    if (req.cookies[0] == null && !req.cookies.accessToken) {
        res.send(`<a href="http://localhost:${PORT}/googleRedirect">Continue with Google</a>`);
    } else {
        try {
            const decode = jwt.verify(req.cookies.accessToken, process.env.JWT_TOKEN_SECRET);
            const user = await userData.findOne({ _id: decode.id });
            console.log(user);
            res.send(`Welcome : ${user.fullName} <a href="/logout">logout</a>`);
        } catch (err) {
            console.log("err token expired : ", err);
            res.redirect("/logout");
        }
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("accessToken");
    res.redirect("/");
});

// Listening server at local 5000 port
app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

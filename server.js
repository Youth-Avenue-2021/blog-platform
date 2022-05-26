const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./Routes/Api/apiRoutes");
const passport = require("passport");
const googleAuth = require("./Routes/Auth/googleAuth");

const app = express();

// PORT Connectivity
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
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

app.get("/", (req, res) => {
    res.send(`<a href="http://localhost:${PORT}/auth/google/callback">Continue with Google</a>`);
});

app.get("/protected", (req, res) => {
    res.send("You are in protected route");
});

// Listening server at local 5000 port
app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./Routes/Api/apiRoutes");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const googleUser = require("./Model/googleUser");
const session = require("express-session");
const isLoggedIn = require("./Middlewares/googleAuth/isLoggedIn");
require("dotenv").config();

const app = express();

// PORT Connectivity
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/api", apiRoutes);

app.use(session({ secret: "secret123", resave: false, saveUninitialized: true, cookie: { secure: true } }));
app.use(passport.initialize());
app.use(passport.session());

// connection with mongoose
mongoose
    .connect("mongodb://localhost/blogPlatform")
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("Database connection failed : ", err));

passport.use(googleUser.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Google auth middleware
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:5000/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            const profileData = {
                name: profile.displayName,
                id: profile.id,
                email: profile.emails[0].value,
                pic: profile.photos[0].value,
            };
            const oldUser = await googleUser.findOne({ userId: profileData.id });
            if (oldUser) {
                done(null, oldUser);
            } else {
                const newUser = new googleUser({
                    userId: profile.id,
                    name: profileData.name,
                    email: profileData.email,
                    profilePic: profileData.pic,
                });
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                    done(null, newUser);
                });
            }
        }
    )
);

app.get("/", (req, res) => {
    res.send(`<a href="http://localhost:${PORT}/auth/google/callback">Continue with Google</a>`);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/protected", failureRedirect: "/auth/google/failure" }));

app.get("/protected", (req, res) => {
    res.send("You are in protected route");
});

// Listening server at local 5000 port
app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

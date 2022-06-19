const express = require("express");
const googleAuth = express.Router();
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleUser = require("../../Model/googleUser");
const userData = require("../../Model/userData");
const jwt = require("jsonwebtoken");
require("dotenv").config();

googleAuth.use(session({ secret: "secret123", resave: false, saveUninitialized: true, cookie: { secure: true } }));
// passport.use(googleUser.createStrategy());

// Google auth middleware
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:5000/googleRedirect",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
            done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

googleAuth.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

googleAuth.get("/googleRedirect", passport.authenticate("google"), async (req, res) => {
    const user = {
        name: req.user.displayName,
        id: req.user.id,
        email: req.user.emails[0].value,
        pic: req.user.photos[0].value,
    };
    findOrCreate(user, res, req);
});

const findOrCreate = async (user, res, req) => {
    const existingUser = await googleUser.findOne({ userId: user.id });
    // console.log(user.id);
    if (existingUser) {
        // console.log("existing user : ", existingUser);
        if (req.cookies[0] == null && !req.cookies.accessToken) {
            const findUserData = await userData.findOne({ user: existingUser._id });
            // console.log(findUserData);
            const token = generateAccessToken(findUserData._id.valueOf());
            res.cookie("accessToken", token);
        }
        return res.redirect("/");
    }
    const newGoogleUser = {
        userId: user.id,
    };
    try {
        const newUser = await googleUser(newGoogleUser);
        newUser.save((err) => {
            if (err) {
                console.log(err);
            }
            const newUserData = {
                user: newUser._id,
                fullName: user.name,
                email: user.email,
                profilePic: user.pic,
            };
            const googleUserData = new userData(newUserData);
            googleUserData.save((err) => {
                if (err) {
                    console.log(err);
                }
                // creating jwt tokens and setting in headers
                const token = generateAccessToken(googleUserData._id.valueOf());
                // console.log("setting cookies");
                res.cookie("accessToken", token);
                res.redirect("/");
            });
        });
    } catch (err) {
        console.log(err);
    }
};

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_TOKEN_SECRET, { expiresIn: "5d" });
};

googleAuth.get("/googleRedirect", passport.authenticate("google", { successRedirect: "/dashboard", failureRedirect: "/login" }));

module.exports = googleAuth;

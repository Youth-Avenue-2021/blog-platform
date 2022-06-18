const express = require("express");
const googleAuth = express.Router();
const isLoggedIn = require("../../Middlewares/googleAuth/isLoggedIn");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleUser = require("../../Model/googleUser");
const userData = require("../../Model/userData");
const jwt = require("jsonwebtoken");
require("dotenv").config();

googleAuth.use(session({ secret: "secret123", resave: false, saveUninitialized: true, cookie: { secure: true } }));
// passport.use(googleUser.createStrategy());

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
                    userId: profileData.id,
                });
                try {
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        done(null, newUser);
                        const newUserData = new userData({
                            user: newUser._id,
                            fullName: profileData.name,
                            email: profileData.email,
                            profilePic: profileData.pic,
                        });
                        newUserData.save(async function (err) {
                            if (err) {
                                console.log(err);
                            }
                            // creating jwt tokens and setting in headers
                            const token = jwt.sign({ id: newUserData._id.valueOf() }, process.env.JWT_TOKEN_SECRET, { expiresIn: "7d" });
                            res.cookie("accessToken", token);
                            console.log(token);
                        });
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }
    )
);

googleAuth.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

googleAuth.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/protected", failureRedirect: "/auth/google/failure" }));

module.exports = googleAuth;

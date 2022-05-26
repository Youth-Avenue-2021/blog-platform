const express = require("express");
const googleAuth = express.Router();
const isLoggedIn = require("../../Middlewares/googleAuth/isLoggedIn");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleUser = require("../../Model/googleUser");
require("dotenv").config();

googleAuth.use(session({ secret: "secret123", resave: false, saveUninitialized: true, cookie: { secure: true } }));
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

googleAuth.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

googleAuth.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/protected", failureRedirect: "/auth/google/failure" }));

module.exports = googleAuth;

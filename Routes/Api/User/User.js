const addUser = require("../../../Controllers/User/addUser");
const express = require("express");

const userRouter = express.Router();

userRouter.post("/add", addUser);

module.exports = userRouter;

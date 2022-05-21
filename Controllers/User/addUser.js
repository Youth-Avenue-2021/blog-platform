const user = require("../../Model/User");

const addUser = async (req, res) => {
    const createdUser = new user(req.body);
    try {
        await createdUser.save();
        res.status(201).json({ msg: "User created successfully.", data: createdUser });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error.", error: err.message });
    }
};

module.exports = addUser;

const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./Routes/Api/apiRoutes");

const app = express();

// PORT Connectivity
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/api", apiRoutes);

// connection with mongoose
mongoose
    .connect("mongodb://localhost/blogPlatform")
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("Database connection failed : ", err));

// Listening server at local 5000 port
app.listen(PORT, () => {
    console.log(`App started at http://localhost:${PORT}`);
});

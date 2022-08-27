const serverless = require("serverless-http");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const userService = require("./services/user");
const authenticateJWT = require("./auth");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

app.set("trust proxy", true);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

// User apis
app.post("/register", userService.register);
app.post("/login", userService.login);

// Blog apis
app.post("/create", authenticateJWT, userService.register);

module.exports.handler = serverless(app);

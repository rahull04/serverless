const Utils = require("../utils");
let User = require("../models/user");

const register = async (req, res) => {
  const requestID = Utils.getRequestID(req);
  const { name, username, password } = req.body;
  try {
    const user = new User({
      name,
      username,
      password,
    });
    const resp = await user.save();
    console.log("resp", resp);
    return res.status(200).send({
      message: "Register successful",
      data: user,
      response: resp,
      requestID,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      message: "Error while registration",
      data: null,
      requestID,
    });
  }
};

const login = async (req, res) => {
  const requestID = Utils.getRequestID(req);
  try {
    const { username, password } = req.body;
    console.log("Req made to login", username);
    let data = await User.find({
      username: username,
      password: password,
    }).exec();
    if (data.length == 0) {
      res.status(200).end({ success: false, msg: "Auth failed", requestID });
    }
    let tokenData = {
      name: data[0].name,
      username: data[0].username,
    };
    let token = await Utils.createToken(tokenData);
    res.status(200).send({
      success: true,
      msg: "Auth successfull",
      token: token,
      requestID,
    });
  } catch (e) {
    console.log("Error while logging in", e);
    res.status(401).send({ success: false, msg: "Auth failed", requestID });
  }
};

module.exports = {
  register,
  login,
};

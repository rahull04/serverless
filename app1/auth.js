const Utils = require("./utils");
const Users = require("./model/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader == undefined) {
    res.status(401).send({ success: false, msg: "Auth failed" });
  }
  const token = authHeader.split(" ")[1];

  console.log("Auth reached");
  const user = await Utils.verifyToken(token);
  console.log("User", user);
  let verifiedUser = await Users.find({
    username: user.username,
    password: user.password,
  }).exec();
  if (verifiedUser.length == 0) {
    res.status(401).send({ success: false, msg: "Auth failed" });
  }
  next();
};

const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  const options = {};
  const token = await jwt.sign(data, process.env.JWT_KEY, options);
  return token;
};

const verifyToken = async (token) => {
  const verifyOptions = {
    expiresIn: "1h",
  };
  try {
    let authTokenRes = await jwt.verify(
      token,
      process.env.JWT_KEY,
      verifyOptions
    );
    console.log("Token verified = ", authTokenRes);
    return authTokenRes;
  } catch (err) {
    return err;
  }
};

const getRequestID = (req) => {
  return req.apiGateway.context.awsRequestId;
};

module.exports = { createToken, verifyToken, getRequestID };

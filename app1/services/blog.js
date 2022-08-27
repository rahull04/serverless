const Utils = require("../utils");
let Blog = require("../models/blog");

module.exports.getBlogList = async (event, context, callback) => {
  const requestID = Utils.getRequestID(req);
  try {
    const blogList = await Blog.find({});
    callback(null, {
      success: true,
      msg: "Fetched blog list",
      requestID,
      data: blogList,
    });
  } catch (e) {
    callback({
      error: e,
      requestID,
    });
  }
};

module.exports = {
  getBlogList,
};

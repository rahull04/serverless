let mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

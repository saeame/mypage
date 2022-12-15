const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("posts", postsSchema);

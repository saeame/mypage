const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);

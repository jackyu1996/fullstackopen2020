const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  favoriteGenre: {
    type: String,
    minlength: 5,
  },
});

module.exports = mongoose.model('User', schema);

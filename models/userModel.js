const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'default_user_name',
  },
  lineID: {
    type: String,
    require: [true, 'lineID is require '],
    unique: [true, 'user already in the database'],
  },
  email: {
    type: String,
  },
  classroom: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

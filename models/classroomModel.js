const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Require classroom name'],
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  content: [String],
  ownerID: String,
  users: [Object],
  accessCode: {
    type: String,
    unique: [true, 'error: code generator collision'],
  },
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;

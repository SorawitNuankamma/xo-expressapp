const mongoose = require('mongoose');
const crypto = require('crypto');

const replaySchema = new mongoose.Schema(
  {
    rowNumber: Number,
    columnNumber: Number,
    playerWin: Number,
    gameHistory: [Object],
    code: {
      type: String,
      unique: true,
    },
    playDate: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// เพิ่มวันทีเปลี่ยนเแปลงลง Database
replaySchema.pre('save', function (next) {
  this.playDate = new Date();
  next();
});

// Generate accessCode on new
replaySchema.pre('save', function (next) {
  if (!this.isNew) return next();

  // Generate Room Code
  this.code = crypto.randomBytes(3).toString('hex');

  next();
});

const Replay = mongoose.model('Replay', replaySchema);

module.exports = Replay;

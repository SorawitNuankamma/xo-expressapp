const Replay = require('../models/replayModel');

exports.getAllReplay = async (req, res) => {
  try {
    const replays = await Replay.find(req.query);
    if (!replays) {
      res.status(400).json({
        status: 'failed',
      });
    }
    res.status(200).json({
      status: 'success',
      data: replays,
    });
  } catch (e) {
    throw new Error(e);
  }
};

exports.postReplay = async (req, res) => {
  try {
    const newReplay = await Replay.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        newReplay,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

exports.getReplay = async (req, res) => {
  try {
    const replay = await Replay.findById(req.params.id);
    if (!replay) {
      res.status(400).json({
        status: 'failed',
      });
    }
    res.status(200).json({
      status: 'success',
      data: replay,
    });
  } catch (e) {
    throw new Error(e);
  }
};

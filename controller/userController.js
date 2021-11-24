const User = require('../models/userModel');

//ROUTE HANDLER
exports.getAllUsers = async (req, res) => {
  try {
    // BUILD QUERY
    // 1 filtering
    const queryObj = { ...req.query }; // create new query object
    const excludeFields = ['page', 'sort', 'limit', 'fields']; // list of unquery word
    excludeFields.forEach((el) => delete queryObj[el]); // get query  from database

    //2 advance filtering
    let queryStr = JSON.stringify(queryObj); // แปลง queryObj เป็น string
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`); // replace string เป็น queryObject

    const query = User.find(JSON.parse(queryStr)); // ค้นหาจาก query object

    // EXECUTE QUERY FOR IMPLEMENT ( AWAIT จะได้ผลลัพท์เป็น object ต้องเอา query แยกไว้)
    const users = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'user not found',
    });
  }
};

exports.postUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    console.log(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
};

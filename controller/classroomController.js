const Classroom = require('../models/classroomModel');
const crypto = require('crypto');

//ROUTE HANDLER
exports.getAllClassrooms = async (req, res) => {
  try {
    // BUILD QUERY
    // 1 filtering
    const queryObj = { ...req.query }; // create new query object
    const excludeFields = ['page', 'sort', 'limit', 'fields']; // list of unquery word
    excludeFields.forEach((el) => delete queryObj[el]); // get query  from database

    //2 advance filtering
    let queryStr = JSON.stringify(queryObj); // แปลง queryObj เป็น string
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`); // replace string เป็น queryObject

    const query = Classroom.find(JSON.parse(queryStr)); // ค้นหาจาก query object

    // EXECUTE QUERY FOR IMPLEMENT ( AWAIT จะได้ผลลัพท์เป็น object ต้องเอา query แยกไว้)
    const classrooms = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        classrooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        classroom,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'classroom not found',
    });
  }
};

exports.postClassroom = async (req, res) => {
  try {
    code = crypto.randomBytes(3).toString('hex');
    let classroomBody = req.body;
    classroomBody.accessCode = code;

    const newClassroom = await Classroom.create(classroomBody);

    res.status(200).json({
      status: 'success',
      data: {
        newClassroom,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data',
    });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        classroom,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid id',
    });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
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

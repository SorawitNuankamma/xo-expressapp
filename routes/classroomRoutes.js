const express = require('express');
const classroomController = require('../controller/classroomController');

// create router from express
const router = express.Router();

// use router for the CRUD operation
router
  .route('/')
  .get(classroomController.getAllClassrooms)
  .post(classroomController.postClassroom);

router
  .route('/:id')
  .get(classroomController.getClassroom)
  .patch(classroomController.updateClassroom)
  .delete(classroomController.deleteClassroom);

module.exports = router;

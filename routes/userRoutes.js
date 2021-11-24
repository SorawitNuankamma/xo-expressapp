const express = require('express');
const userController = require('../controller/userController');

// create router from express
const router = express.Router();

// use router for the CRUD operation
router.route('/').get(userController.getAllUsers).post(userController.postUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

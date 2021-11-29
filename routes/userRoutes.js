const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

// create router from express
const router = express.Router();

// User route
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Aggreatte route
router.route('/users-stats').get(userController.getUserStats);

// CRUD Route
router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.postUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

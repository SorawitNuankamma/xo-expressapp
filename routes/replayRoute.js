const express = require('express');
const replayController = require('../controller/replayController');

// create router from express
const router = express.Router();

router
  .route('/')
  .get(replayController.getAllReplay)
  .post(replayController.postReplay);

// CRUD Route  Authentication | Authorization | Responce
router.route('/:id').get(replayController.getReplay);

module.exports = router;

const express = require('express');
const infoController = require('../controller/infoController');

// create router from express
const router = express.Router();

// router run when there is the specifict param
router.param('id', infoController.checkID);

// use router for the CRUD operation
router
  .route('/')
  .get(infoController.getAllInformations)
  .post(infoController.checkBody, infoController.postInformation);

router
  .route('/:id')
  .get(infoController.getInformation)
  .patch(infoController.patchInformation)
  .delete(infoController.deleteInformation);

module.exports = router;

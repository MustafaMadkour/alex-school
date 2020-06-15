const express = require('express');
const tutController = require('../controllers/tutController');

const router = express.Router();

router.param('id', tutController.checkID);

router
  .route('/')
  .get(tutController.getAllTuts)
  .post(tutController.checkBody, tutController.createTut);

router
  .route('/:id')
  .get(tutController.getTut)
  .patch(tutController.updateTut)
  .delete(tutController.deleteTut);

module.exports = router;

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/newsletter', feedbackController.subscribeNewsletter);

module.exports = router;


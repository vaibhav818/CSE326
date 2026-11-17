const express = require('express');
const router = express.Router();
const volunteersController = require('../controllers/volunteersController');

router.post('/register', volunteersController.registerVolunteer);
router.post('/adopt', volunteersController.submitAdoptionInquiry);

module.exports = router;


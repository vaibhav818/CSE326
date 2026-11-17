const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

router.post('/', donationsController.createDonation);
router.get('/recent', donationsController.getRecentDonations);

module.exports = router;


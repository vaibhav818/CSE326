const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programsController');

router.get('/', programsController.getAllPrograms);
router.get('/stats', programsController.getStats);
router.get('/:id', programsController.getProgramById);

module.exports = router;


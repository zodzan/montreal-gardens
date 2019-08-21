const express = require('express');
const router = express.Router();

const stopController = require('../controllers/stop.controller');

router.get('/api/bus-stops', stopController.getStopsByDistance);

module.exports = router;
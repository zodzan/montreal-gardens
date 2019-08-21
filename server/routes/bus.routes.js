const express = require('express');
const router = express.Router();

const busController = require('../controllers/bus.controller');

router.get('/api/bus-stops', busController.getBusStopsByDistance);

module.exports = router;
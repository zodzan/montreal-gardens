const express = require('express');
const router = express.Router();

const gardenController = require('../controllers/garden.controller');

router.get('/api/gardens', gardenController.getGardens);

module.exports = router;
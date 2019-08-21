const stopService = require("../services/stop.service");

const getStopsByDistance = (req, res, next) => {
  stopService.getStopsByDistance(req.query).catch(err => {
    res.send(err);
  });
};

module.exports = { getStopsByDistance };

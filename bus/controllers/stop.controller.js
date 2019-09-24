const stopService = require("../services/stop.service");

const StopView = require("../views/stop.view");
const GeometryView = require("../views/geometry.view");

const errorTypes = require("../enums/error-types.enum");

const MISSING_PARAMETER_MSG = "Parameter is missing";
const INVALID_NUMERIC_PARAMETER_MSG = "Parameter must be numeric"

const getStopsByDistance = (req, res) => {
  stopService
    .getStopsByDistance(req.query)
    .then(stops => {
      const stopstoSend= stops.map(stop => {
        stop.geometry = GeometryView(stop.geometry);
        stop = StopView(stop);
        return stop;
      })
      res.status(200).json(stopstoSend);
    })
    .catch(err => {
      if (err.type != null && err.type === errorTypes.INVALID_QUERY) {
        let message = [];

        const errors = err.errors;
        errors.forEach(error => {
          if (error.type === errorTypes.MISSING_PARAM) {
            message.push({
              parameter: error.parameter,
              message: MISSING_PARAMETER_MSG
            });
          } else if (error.type === errorTypes.INVALID_NUMERIC_PARAM) {
            message.push({
              parameter: error.parameter,
              message: INVALID_NUMERIC_PARAMETER_MSG
            });
          }
        });
        res.status(400).json(message);
      } else {
        res.status(500).send();
      }
    });
};

module.exports = { getStopsByDistance };

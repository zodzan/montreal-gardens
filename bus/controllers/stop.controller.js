const stopService = require("../services/stop.service");

const errorTypes = require("../enums/error-types.enum");

const getStopsByDistance = (req, res) => {
  stopService
    .getStopsByDistance(req.query)
    .then(stops => {
      res.status(200).json(stops);
    })
    .catch(err => {
      if (err.type != null && err.type === errorTypes.INVALID_QUERY) {
        let message = [];

        const errors = err.errors;
        errors.forEach(error => {
          if (error.type === errorTypes.MISSING_PARAM) {
            message.push({
              parameter: error.parameter,
              message: "Parameter is missing"
            });
          } else if (error.type === errorTypes.INVALID_NUMERIC_PARAM) {
            message.push({
              parameter: error.parameter,
              message: "Parameter must be numeric"
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

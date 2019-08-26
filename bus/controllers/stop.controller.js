const stopService = require("../services/stop.service");

const errorTypes = require("../enums/error-types.enum");

const getStopsByDistance = (req, res) => {
  stopService.getStopsByDistance(req.query)
  .then(stops => {
    res.status(200).json({message: "NOT IMPLEMENTED YET"});
  })
  .catch(errors => {
    let message = [];

    errors.forEach(err => {
      if (err.type === errorTypes.MISSING_PARAM) {
        message.push({ parameter: err.parameter, message: "Parameter is missing" });
      } else if (err.type === errorTypes.INVALID_NUMERIC_PARAM) {
        message.push({ parameter: err.parameter, message: "Parameter must be numeric" });
      }
    });
    
    res.status(400).json(message);
  });
};

module.exports = { getStopsByDistance };

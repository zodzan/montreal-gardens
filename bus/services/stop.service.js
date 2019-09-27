const { isNumeric } = require("validator");

const stopReposistory = require("../repositories/stop.repository");
const errorTypes = require("../enums/error-types.enum");

const insertStops = stopsData => {
  const stops = stopsData.features;

  return stopReposistory.insertStops(stops);
};

const getStopsByDistance = query => {
  const queryParams = {
    LNG: "lng",
    LAT: "lat",
    RADIUS: "radius"
  };

  const errors = [];

  if (query.lng == null || query.lng.trim().length === 0) {
    errors.push({ type: errorTypes.MISSING_PARAM, parameter: queryParams.LNG });
  } else if (!isNumeric(query.lng)) {
    errors.push({ type: errorTypes.INVALID_NUMERIC_PARAM, parameter: queryParams.LNG });
  }

  if (query.lat == null || query.lat.trim().length === 0) {
    errors.push({ type: errorTypes.MISSING_PARAM, parameter: queryParams.LAT });
  } else if (!isNumeric(query.lat)) {
    errors.push({ type: errorTypes.INVALID_NUMERIC_PARAM, parameter: queryParams.LAT });
  }

  if (query.radius == null || query.radius.trim().length === 0) {
    errors.push({ type: errorTypes.MISSING_PARAM, parameter: queryParams.RADIUS });
  } else if (!isNumeric(query.radius)) {
    errors.push({ type: errorTypes.INVALID_NUMERIC_PARAM, parameter: queryParams.RADIUS });
  }

  if (errors.length > 0) {
    return Promise.reject({ type: errorTypes.INVALID_QUERY, errors });
  } else {
    return stopReposistory.selectStopsByDistance(query);
  }
};

module.exports = { insertStops, getStopsByDistance };

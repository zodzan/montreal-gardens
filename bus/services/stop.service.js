const stopReposistory = require("../repositories/stop.repository");

const insertStops = stopsData => {
  const stops = stopsData.features;

  return stopReposistory.insertStops(stops);
};

const getStopsByDistance = query => {
  return stopReposistory.selectStopsByDistance(query);
};

module.exports = { insertStops, getStopsByDistance };

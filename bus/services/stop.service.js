const stopReposistory = require("../repositories/stop.repository");

const insertStopList = stopData => {
  const stopList = stopData.features;

  return stopReposistory.insertStopList(stopList);
};

module.exports = { insertStopList };

const fs = require("fs");

const stopService = require("../services/stop.service");

const stmStopsJsonPath = "../data/stm/stm-stops.json";

const loadLocalData = () => {
  const localData = require(stmStopsJsonPath);

  return stopService.insertStopList(localData);
};

module.exports = { loadLocalData };

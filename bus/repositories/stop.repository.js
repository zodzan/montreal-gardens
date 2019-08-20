const knex = require("../services/database");

const StopModel = require("../models/stop.model");

const insertStopList = async stopList => {
  const stops = stopList.map(stop => {
    stop = StopModel(stop);
    stop.geometry = knex.st.geomFromGeoJSON(stop.geometry);
    return stop;
  });

  return await knex.db.batchInsert("stops", stops).returning("id");
};

module.exports = { insertStopList };
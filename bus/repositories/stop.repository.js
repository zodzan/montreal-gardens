const { st, db } = require("../services/database");

const StopModel = require("../models/stop.model");

const insertStopList = async stopList => {
  const stops = stopList.map(stop => {
    stop = StopModel(stop);
    stop.geometry = st.geomFromGeoJSON(stop.geometry);
    return stop;
  });

  return await db.batchInsert("stops", stops).returning("id");
};

module.exports = { insertStopList };

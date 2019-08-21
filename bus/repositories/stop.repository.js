const { st, db } = require("../services/database");

const StopModel = require("../models/stop.model");

const insertStops = async stops => {
  stops = stops.map(stop => {
    stop = StopModel(stop);
    stop.geometry = st.geomFromGeoJSON(stop.geometry);
    return stop;
  });

  return await db.batchInsert("stops", stops).returning("id");
};

const selectStopsByDistance = async query => {
  throw "NOT IMPLEMENTED: get bus stops by distance.";
};

module.exports = { insertStops, selectStopsByDistance };

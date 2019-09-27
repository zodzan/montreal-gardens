const { st, db } = require("../services/database");

const StopModel = require("../models/stop.model");
const GeometryModel = require("../models/geometry.model");

const insertStops = async stops => {
  stops = stops.map(stop => {
    stop = StopModel(stop);
    stop.geometry = st.geomFromGeoJSON(stop.geometry);
    return stop;
  });

  return await db.batchInsert("stops", stops).returning("id");
};

const selectStopsByDistance = async query => {
  const type = "Point";
  const coords = [Number.parseFloat(query.lng), Number.parseFloat(query.lat)];
  const geo = GeometryModel(type, coords);

  const stops = await db
    .select("id", "name", st.asGeoJSON("geometry"))
    .from("stops")
    .where(
      st.dwithin(st.geomFromGeoJSON(geo), "stops.geometry", query.radius, true)
    );

  stops.map(stop => {
    stop.geometry = JSON.parse(stop.geometry);
    return stop;
  });

  return stops;
};

module.exports = { insertStops, selectStopsByDistance };

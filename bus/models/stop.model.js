const StopModel = stop => {
  return {
    id: stop.properties.stop_id,
    name: stop.properties.stop_name,
    geometry: stop.geometry
  };
};

module.exports = StopModel;

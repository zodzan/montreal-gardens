const toView = stop => {
  return {
    id: stop.id,
    name: stop.name,
    geometry: stop.geometry
  };
};

module.exports = toView;

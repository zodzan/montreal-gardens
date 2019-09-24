const toView = geometry => {
    return {
        type: geometry.type,
        coordinates: geometry.coordinates
    };
};

module.exports = toView;
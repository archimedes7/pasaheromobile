const withPodfileModifications = (config) => {
  return {
    ...config,
    ios: {
      ...config.ios,
      podfileProperties: {
        ...config.ios?.podfileProperties,
        "use_frameworks!": "",
        "use_modular_headers!": "",
      },
    },
  };
};

module.exports = function (config) {
  return withPodfileModifications(config);
};

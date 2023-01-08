module.exports = function override(config, env) {
  console.log("override");
  let loaders = config.resolve;
  loaders.fallback = {
    console: require.resolve("console-browserify"),
  };

  return config;
};

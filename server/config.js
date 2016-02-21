'use strict';

// normally you'd just use a config.json direclty, but I'd like Heroku to be able to store some private info
// in config vars. This just lets env vars override config options if they're present.
const _ = require('lodash');

let config = require('../config.json');

let envConfig = {
      forecastio: {
          apiKey: process.env.FORECASTIO_API_KEY,
          location: {
              lat: process.env.FORECASTIO_LOC_LAT,
              lng: process.env.FORECASTIO_LOC_LNG
          }
      },
      
      user: {
          name: process.env.USER_NAME
      }
};

if (envConfig.forecastio.location.lat) {
    envConfig.forecastio.location.lat =
        Number.parseFloat(envConfig.forecastio.location.lat);
}
if (envConfig.forecastio.location.lng) {
    envConfig.forecastio.location.lng =
        Number.parseFloat(envConfig.forecastio.location.lng);
}

export default _.defaultsDeep(envConfig, config);
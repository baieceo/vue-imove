'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }

    cors: {
        enable: true,
        package: 'egg-cors',
    },

    lowdb: {
        enable: true,
        // package: 'egg-lowdb',
        path: path.join(__dirname, '../lib/plugin/lowdb'),
    },
};
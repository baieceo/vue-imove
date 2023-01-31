'use strict';

const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }

    // 跨域插件
    cors: {
        enable: true,
        package: 'egg-cors',
    },

    // 数据库插件
    lowdb: {
        enable: true,
        // package: 'egg-lowdb',
        path: path.join(__dirname, '../lib/plugin/lowdb'),
    },

    // 验证插件
    validate: {
        enable: true,
        package: 'egg-validate'
    }
};
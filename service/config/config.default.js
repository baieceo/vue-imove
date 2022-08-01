/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1659191543232_4375';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        // 关闭 csrf
        csrf: {
            enable: false,
        },
        // 跨域白名单
        domainWhiteList: ['http://localhost:8888'],
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET, PUT, POST, DELETE, PATCH'
    };

    // lowdb
    config.lowdb = {
        path: 'database/',
        app: true,
        agent: true
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
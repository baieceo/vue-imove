'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;

    router.get('/', controller.home.index);
    router.post('/project/add', controller.project.add);
    router.get('/project/list', controller.project.list);
};
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;

    router.get('/', controller.home.index);

    // 项目
    router.post('/project/add', controller.project.add);
    router.post('/project/remove', controller.project.remove);
    router.post('/project/update', controller.project.update);
    router.get('/project/query', controller.project.query);
    router.get('/project/list', controller.project.list);
};
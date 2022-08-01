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

    // 逻辑
    router.post('/logicflow/add', controller.logicflow.add);
    router.post('/logicflow/remove', controller.logicflow.remove);
    router.post('/logicflow/update', controller.logicflow.update);
    router.get('/logicflow/query', controller.logicflow.query);
    router.get('/logicflow/list', controller.logicflow.list);
};
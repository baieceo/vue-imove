'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    const { router, controller } = app;

    router.get('/', controller.home.index);

    /** 通用 */
    // 上传文件
    router.post('/common/upload', controller.common.upload);

    /** 项目 */
    // 新增项目
    router.post('/project/add', controller.project.add);
    // 删除项目
    router.post('/project/remove', controller.project.remove);
    // 更新项目
    router.post('/project/update', controller.project.update);
    // 查询项目
    router.get('/project/query', controller.project.query);
    // 项目列表
    router.get('/project/list', controller.project.list);
    // 发布项目
    router.post('/project/publish', controller.project.publish);

    /** 逻辑 */
    // 新增逻辑
    router.post('/logicflow/add', controller.logicflow.add);
    // 删除逻辑
    router.post('/logicflow/remove', controller.logicflow.remove);
    // 更新逻辑
    router.post('/logicflow/update', controller.logicflow.update);
    // 查询逻辑
    router.get('/logicflow/query', controller.logicflow.query);
    // 逻辑列表
    router.get('/logicflow/list', controller.logicflow.list);

    /** 物料 */
    // 新增物料
    router.post('/material/add', controller.material.add);
    // 删除物料
    router.post('/material/remove', controller.material.remove);
    // 更新物料
    router.post('/material/update', controller.material.update);
    // 查询物料
    router.get('/material/query', controller.material.query);
    // 物料列表
    router.get('/material/list', controller.material.list);
};
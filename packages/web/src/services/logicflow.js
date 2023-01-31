import request from '../utils/request';

/**
 * 名称: 新增逻辑
 * 方法: POST
 * 路径: '/api/logicflow/add'
 * @param {String} name 逻辑名称
 * @param {String} title 逻辑标题
 */
export async function apiLogicflowAdd(params) {
    return request({
        url: `/api/logicflow/add`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 删除逻辑
 * 方法: POST
 * 路径: '/api/logicflow/remove'
 * @param {String} id 逻辑ID
 */
export async function apiLogicflowRemove(params) {
    return request({
        url: `/api/logicflow/remove`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 更新逻辑
 * 方法: POST
 * 路径: '/api/logicflow/update'
 * @param {String} id 逻辑ID
 * @param {String} name 逻辑名称
 * @param {String} title 逻辑标题
 * @param {Object} schema 逻辑schema
 */
export async function apiLogicflowUpdate(params) {
    return request({
        url: `/api/logicflow/update`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 查询逻辑
 * 方法: GET
 * 路径: '/api/logicflow/query'
 * @param {String} id 逻辑ID
 */
export async function apiLogicflowQuery(params) {
    return request({
        url: `/api/logicflow/query`,
        method: 'GET',
        params,
    });
}

/**
 * 名称: 逻辑列表
 * 方法: GET
 * 路径: '/api/logicflow/list'
 */
export async function apiLogicflowList(params) {
    return request({
        url: `/api/logicflow/list`,
        method: 'GET',
        params,
    });
}
import request from '../utils/request';

/**
 * 名称: 新增项目
 * 方法: POST
 * 路径: '/api/project/add'
 * @param {String} name 项目名称
 * @param {String} title 项目标题
 */
export async function apiProjectAdd(params) {
    return request({
        url: `/api/project/add`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 删除项目
 * 方法: POST
 * 路径: '/api/project/remove'
 * @param {String} id 项目ID
 */
export async function apiProjectRemove(params) {
    return request({
        url: `/api/project/remove`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 更新项目
 * 方法: POST
 * 路径: '/api/project/update'
 * @param {String} id 项目ID
 * @param {String} name 项目名称
 * @param {String} title 项目标题
 * @param {Object} schema 项目schema
 */
export async function apiProjectUpdate(params) {
    return request({
        url: `/api/project/update`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 查询项目
 * 方法: GET
 * 路径: '/api/project/query'
 * @param {String} id 项目ID
 */
export async function apiProjectQuery(params) {
    return request({
        url: `/api/project/query`,
        method: 'GET',
        params,
    });
}

/**
 * 名称: 项目列表
 * 方法: GET
 * 路径: '/api/project/list'
 */
export async function apiProjectList(params) {
    return request({
        url: `/api/project/list`,
        method: 'GET',
        params,
    });
}

/**
 * 名称: 发布项目
 * 方法: POST
 * 路径: '/api/project/publish'
 * @param {String} id 项目ID
 */
export async function apiProjectPublish(params) {
    return request({
        url: `/api/project/publish`,
        method: 'POST',
        data: params,
    });
}
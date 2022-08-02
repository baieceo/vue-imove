import request from '../utils/request';

/**
 * 名称: 新增物料
 * 方法: POST
 * 路径: '/api/material/add'
 * @param {String} name 物料名称
 * @param {String} title 物料标题
 */
export async function apiMaterialAdd(params) {
    return request({
        url: `/api/material/add`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 删除物料
 * 方法: POST
 * 路径: '/api/material/remove'
 * @param {String} id 物料ID
 */
export async function apiMaterialRemove(params) {
    return request({
        url: `/api/material/remove`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 更新物料
 * 方法: POST
 * 路径: '/api/material/update'
 * @param {String} id 物料ID
 * @param {String} name 物料名称
 * @param {String} title 物料标题
 * @param {Object} schema 物料schema
 */
export async function apiMaterialUpdate(params) {
    return request({
        url: `/api/material/update`,
        method: 'POST',
        data: params,
    });
}

/**
 * 名称: 查询物料
 * 方法: GET
 * 路径: '/api/material/query'
 * @param {String} id 物料ID
 */
export async function apiMaterialQuery(params) {
    return request({
        url: `/api/material/query`,
        method: 'GET',
        params,
    });
}

/**
 * 名称: 物料列表
 * 方法: GET
 * 路径: '/api/material/list'
 */
export async function apiMaterialList(params) {
    return request({
        url: `/api/material/list`,
        method: 'GET',
        params,
    });
}
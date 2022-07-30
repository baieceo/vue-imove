import request from '../utils/request';

/**
 * 名称: 合作商管理 - 分页查询
 * 方法: GET
 * 路径: '/mp/manage/partnerInfo/findPage'
 */
export async function findPage(params) {
    return request(`/mp/manage/partnerInfo/findPage`, {
        method: 'GET',
        params,
    });
}

/**
 * 名称: 合作商管理 - 分页查询
 * 方法: GET
 * 路径: '/mp/manage/partnerInfo/operate'
 */
export async function operate(params) {
    return request(`/mp/manage/partnerInfo/operate`, {
        method: 'POST',
        data: params,
    });
}
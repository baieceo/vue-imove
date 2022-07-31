'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class HomeController extends Controller {
    // 新增项目
    async add() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);

        const res = await service.project.add({
            ...req,
            createTime: +new Date()
        });

        ctx.body = {
            code: 0,
            data: res,
            message: 'success'
        }
    }

    // 删除项目
    async remove() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);

        const res = await service.project.remove(req);

        ctx.body = {
            code: 0,
            data: res,
            message: 'success'
        }
    }

    // 查询列表
    async list() {
        const { ctx, service } = this;
        const { query } = ctx;
        const pageNo = query.pageNo ? Number(query.pageNo) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;

        // 调用 Service 进行业务处理
        let { list, count } = await service.project.findList({}, {
            orderBy: 'desc',
            offset: (pageNo - 1) * pageSize,
            limit: pageSize
        });

        list = list.map(item => ({
            ...item,
            createTime: moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        }));

        ctx.body = {
            code: 0,
            data: {
                list,
                total: count,
                pageNo,
                pageSize
            },
            message: 'success'
        };
    }
}

module.exports = HomeController;
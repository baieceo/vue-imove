'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    // 新增项目
    async add() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);

        const res = await service.project.add({
            req,
            createTime: +new Date()
        });

        ctx.body = {
            code: 0,
            data: res,
            message: 'success'
        }
    }

    async list() {
        const { ctx, service } = this;

        // 调用 Service 进行业务处理
        const list = await service.project.findList({});

        ctx.body = {
            code: 0,
            data: {
                list
            },
            message: 'success'
        };
    }
}

module.exports = HomeController;
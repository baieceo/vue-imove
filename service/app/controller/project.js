'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class ProjectController extends Controller {
    // 新增项目
    async add() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);
        const addRule = {
            name: {
                type: 'string',
                required: true
            },
            schema: {
                type: 'object',
                required: true
            }
        };

        ctx.validate(addRule);

        const res = await service.project.add({
            ...req,
            createTime: +new Date(),
        });

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 删除项目
    async remove() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);

        const res = await service.project.remove(req);

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 更新项目
    async update() {
        const { ctx, service } = this;
        const updateRule = {
            id: {
                type: 'string',
                required: true,
            },
            schema: {
                type: 'object',
                require: true,
            },
        };

        // 校验参数
        ctx.validate(updateRule);

        const { id, schema } = ctx.request.body;

        const params = {
            id
        };
        const values = {
            schema
        };

        const res = await service.project.update(params, values);

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 查询项目
    async query() {
        const { ctx, service } = this;
        const queryRule = {
            id: {
                type: 'string',
                required: true,
                message: 'id不能为空'
            },
        };
        const { query } = ctx;

        ctx.validate(queryRule, query);

        try {
            const record = await service.project.find(query);

            ctx.body = {
                code: 0,
                data: record,
                message: 'success',
            };
        } catch (err) {
            ctx.logger.warn(err.errors);

            ctx.body = {
                code: 1,
                data: null,
                message: err.message || '查询项目失败',
            };
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
            limit: pageSize,
        });

        list = list.map((item) => ({
            ...item,
            createTime: moment(item.createTime).format('YYYY/MM/DD HH:mm:ss'),
        }));

        ctx.body = {
            code: 0,
            data: {
                list,
                total: count,
                pageNo,
                pageSize,
            },
            message: 'success',
        };
    }

    // 发布项目
    async publish() {
        const { ctx, service } = this;
        const publishRule = {
            id: {
                type: 'string'
            }
        };

        ctx.validate(publishRule);


    }
}

module.exports = ProjectController;
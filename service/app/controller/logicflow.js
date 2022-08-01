'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class LogicFlowController extends Controller {
    // 新增逻辑
    async add() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);
        const addRule = {
            name: {
                type: 'string',
                required: true,
            },
            dsl: {
                type: 'object',
                required: true,
            },
        };

        ctx.validate(addRule);

        const res = await service.logicflow.add({
            ...req,
            createTime: +new Date(),
        });

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 删除逻辑
    async remove() {
        const { ctx, service } = this;
        const req = Object.assign(ctx.request.body);

        const res = await service.logicflow.remove(req);

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 更新逻辑
    async update() {
        const { ctx, service } = this;
        const updateRule = {
            id: {
                type: 'string',
                required: true,
            },
        };

        // 校验参数
        ctx.validate(updateRule);

        const { id } = ctx.request.body;
        const data = {...ctx.request.body };

        delete data.id;

        const params = {
            id,
        };
        const values = data;

        const res = await service.logicflow.update(params, values);

        ctx.body = {
            code: 0,
            data: res,
            message: 'success',
        };
    }

    // 查询逻辑
    async query() {
        const { ctx, service } = this;
        const queryRule = {
            id: {
                type: 'string',
                required: true,
                message: 'id不能为空',
            },
        };
        const { query } = ctx;

        ctx.validate(queryRule, query);

        try {
            const record = await service.logicflow.find(query);

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
                message: err.message || '查询逻辑失败',
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
        let { list, count } = await service.logicflow.findList({}, {
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
}

module.exports = LogicFlowController;
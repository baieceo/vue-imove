// app/service/logicflow.js
const Service = require('egg').Service;

class LogicFlowService extends Service {
    // 新增逻辑
    async add(params) {
        const res = await this.ctx.app.lowdb.model('logicflow').add(params);

        return res;
    }

    // 删除逻辑
    async remove(params = {}) {
        const res = await this.ctx.app.lowdb.model('logicflow').remove(params);

        return res;
    }

    // 更新逻辑
    async update(params = {}, values = {}) {
        const res = await this.ctx.app.lowdb.model('logicflow').findAndUpdate(params, values);

        return res;
    }

    // 查询逻辑
    async find(params = {}) {
        const res = await this.ctx.app.lowdb.model('logicflow').findOne(params);

        return res;
    }

    // 查找逻辑列表
    async findList(params = {}, options = {}) {
        const defaultOptions = {
            sortBy: 'createTime',
            orderBy: 'asc',
            offset: 0,
            limit: 5
        };
        const list = await this.ctx.app.lowdb.model('logicflow').find(params, {
            ...defaultOptions,
            ...options
        });

        const count = await this.ctx.app.lowdb.model('logicflow').count(params);

        return {
            list,
            count
        };
    }


}

module.exports = LogicFlowService;
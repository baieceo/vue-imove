// app/service/material.js
const Service = require('egg').Service;

class MaterialService extends Service {
    // 新增物料
    async add(params) {
        const res = await this.ctx.app.lowdb.model('material').add(params);

        return res;
    }

    // 删除物料
    async remove(params = {}) {
        const res = await this.ctx.app.lowdb.model('material').remove(params);

        return res;
    }

    // 更新物料
    async update(params = {}, values = {}) {
        const res = await this.ctx.app.lowdb.model('material').findAndUpdate(params, values);

        return res;
    }

    // 查询物料
    async find(params = {}) {
        const res = await this.ctx.app.lowdb.model('material').findOne(params);

        return res;
    }

    // 查找物料列表
    async findList(params = {}, options = {}) {
        const defaultOptions = {
            sortBy: 'createTime',
            orderBy: 'asc',
            offset: 0,
            limit: 5
        };
        const list = await this.ctx.app.lowdb.model('material').find(params, {
            ...defaultOptions,
            ...options
        });

        const count = await this.ctx.app.lowdb.model('material').count(params);

        return {
            list,
            count
        };
    }


}

module.exports = MaterialService;
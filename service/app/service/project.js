// app/service/project.js
const Service = require('egg').Service;

class ProjectService extends Service {
    // 新增项目
    async add(params) {
        const res = await this.ctx.app.lowdb.model('project').add(params);

        return res;
    }

    // 删除项目
    async remove(params = {}) {
        const res = await this.ctx.app.lowdb.model('project').remove(params);

        return res;
    }

    // 更新项目
    async update(params = {}, values = {}) {
        const res = await this.ctx.app.lowdb.model('project').findAndUpdate(params, values);

        return res;
    }

    // 查询项目
    async find(params = {}) {
        const res = await this.ctx.app.lowdb.model('project').findOne(params);

        return res;
    }

    // 查找项目列表
    async findList(params = {}, options = {}) {
        const defaultOptions = {
            sortBy: 'createTime',
            orderBy: 'asc',
            offset: 0,
            limit: 5
        };
        const list = await this.ctx.app.lowdb.model('project').find(params, {
            ...defaultOptions,
            ...options
        });

        const count = await this.ctx.app.lowdb.model('project').count(params);

        return {
            list,
            count
        };
    }


}

module.exports = ProjectService;
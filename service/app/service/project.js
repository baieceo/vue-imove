// app/service/project.js
const Service = require('egg').Service;

class ProjectService extends Service {
    // 新增项目
    async add(params) {
        const res = await this.ctx.app.lowdb.model('project').add(params);

        return res;
    }

    // 查找项目列表
    async findList(params) {
        const list = await this.ctx.app.lowdb.model('project').find({});

        return list;
    }
}

module.exports = ProjectService;
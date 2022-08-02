'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const mkdir = require('mkdirplz');
const shortid = require('shortid');
const sendToWormhole = require('stream-wormhole');

class CommonController extends Controller {
    // 上传
    async upload() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const { path: dir = '', rename = true } = stream.fields;

        const upload = 'public/upload/';
        const extname = path.extname(stream.filename);
        const filename = !rename || rename === 'false' ?
            stream.filename :
            shortid.generate() + extname;

        const dirpath = upload + dir.replace(/^[\/\.]*|\/$/g, '');

        // 文件处理，上传到云存储等等
        let result;

        try {
            const fullpath = dirpath + '/' + filename;

            await mkdir(path.resolve(__dirname, '../' + dirpath));
            await stream.pipe(
                fs.createWriteStream(path.resolve(__dirname, '../' + fullpath))
            );

            result = {
                url: `/api/${fullpath}`,
            };

            ctx.body = {
                code: 0,
                data: {
                    url: result.url,
                    // 所有表单字段都能通过 `stream.fields` 获取到
                    fields: stream.fields,
                },
                message: 'success',
            };
        } catch (err) {
            ctx.logger.warn(err.errors);

            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);

            ctx.body = {
                code: 1,
                data: null,
                message: '上传失败',
            };
        }
    }
}

module.exports = CommonController;
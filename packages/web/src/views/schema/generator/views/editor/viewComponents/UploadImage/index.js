/**
 * Created by Liu.Jun on 2020/11/27 11:03 下午.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '图片文件',
    type: 'string',
    'ui:widget': 'UploadImageWidget',
};
export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '选项',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    required: ['action'],
                    properties: {
                        action: {
                            title: '上传接口',
                            type: 'string',
                            format: 'string',
                            default: '/common/uploadFile'
                        },
                        btnText: {
                            title: '上传按钮文案',
                            type: 'string'
                        },
                        listType: {
                            title: '样式类型',
                            type: 'string',
                            enum: ['text', 'picture', 'picture-card'],
                            enumNames: ['Text', 'Picture', 'PictureCard'],
                            default: 'picture-card'
                        },
                        limit: {
                            title: '最大允许上传个数',
                            type: 'number',
                            format: 'number',
                            default: 1
                        },
                    }
                }
            }
        }
    })
};
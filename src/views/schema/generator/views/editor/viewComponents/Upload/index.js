/**
 * Created by Liu.Jun on 2020/11/27 11:03 下午.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '单文件',
    type: 'string',
    'ui:widget': 'UploadWidget',
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
                        }
                    }
                }
            }
        }
    })
};

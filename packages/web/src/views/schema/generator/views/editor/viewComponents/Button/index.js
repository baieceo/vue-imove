/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '按钮',
    type: 'string',
    'ui:widget': 'ButtonWidget',
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
                    properties: {
                        text: {
                            type: 'string',
                            title: '按钮文字',
                            default: '按钮',
                        },
                        size: {
                            type: 'string',
                            title: '尺寸',
                            enum: ['medium', 'small', 'mini'],
                            enumNames: ['中等', '小型', '迷你'],
                        },
                        type: {
                            type: 'string',
                            title: '类型',
                            enum: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
                            enumNames: ['主要', '成功', '警告', '危险', '信息', '文本'],
                        },
                        plain: {
                            title: '朴素按钮',
                            type: 'boolean',
                            default: false,
                        },
                        round: {
                            title: '圆角按钮',
                            type: 'boolean',
                            default: false,
                        },
                        disabled: {
                            title: '是否禁用',
                            type: 'boolean',
                            default: false,
                        },
                        icon: {
                            type: 'string',
                            title: '图标类名',
                        },
                        autofocus: {
                            title: '默认聚焦',
                            type: 'boolean',
                            default: false,
                        },
                        nativeType: {
                            type: 'string',
                            title: '原生类型',
                            enum: ['button', 'submit', 'reset'],
                            enumNames: ['按钮', '提交', '重置'],
                        },
                    },
                },
            },
        },
    }),
};
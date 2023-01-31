/**
 * Created by Liu.Jun on 2019/11/29 11:25.
 */

import createVue2Core, { fieldProps, SchemaField } from '../../../../lib/vue2/vue2-core';

import i18n from '../../../../lib/utils/i18n';
import * as vueUtils from '../../../../lib/utils/vueUtils';
import * as formUtils from '../../../../lib/utils/formUtils';
import * as schemaValidate from '../../../../lib/utils/schema/validate';
import getDefaultFormState from '../../../../lib/utils/schema/getDefaultFormState';

import WIDGET_MAP from './config/widgets/WIDGET_MAP.js';

import './style.scss';

const globalOptions = Object.freeze({
    WIDGET_MAP: Object.freeze(WIDGET_MAP),
    COMPONENT_MAP: Object.freeze({
        form: 'el-form',
        formItem: 'el-form-item',
        button: 'el-button',
        popover: 'el-popover'
    }),
    HELPERS: {
        // 是否mini显示 description
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labelPosition);
        }
    }
});

const JsonSchemaForm = createVue2Core(globalOptions);

// 存在Vue 全局变量默认注册 VueForm 组件
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('VueForm', JsonSchemaForm);
}

export default JsonSchemaForm;

export {
    globalOptions,
    SchemaField,
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
};
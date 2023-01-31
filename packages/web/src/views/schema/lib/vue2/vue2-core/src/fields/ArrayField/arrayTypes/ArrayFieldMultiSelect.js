/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import {
    getWidgetConfig,
    optionsList
} from '../../../../../../../lib/utils/formUtils';
import retrieveSchema from '../../../../../../../lib/utils/schema/retriev';
import vueProps from '../../props';

import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldMultiSelect',
    functional: true,
    props: {
        ...vueProps
    },
    render(h, context) {
        const {
            schema,
            rootSchema,
            uiSchema,
            curNodePath,
            rootFormData,
            globalOptions
        } = context.props;

        // 这里需要索引当前节点，通过到schemaField组件的会统一处理
        const itemsSchema = retrieveSchema(schema.items, rootSchema);

        const enumOptions = optionsList(itemsSchema, uiSchema, curNodePath, rootFormData);

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        }, () => ({
            widget: globalOptions.WIDGET_MAP.common.checkboxGroup
        }));

        // 存在枚举数据列表 传入 enumOptions
        widgetConfig.uiProps.multiple = true;

        if (enumOptions && !widgetConfig.uiProps.enumOptions) {
            widgetConfig.uiProps.enumOptions = enumOptions;
        }

        return h(
            Widget, {
                ...context.data,
                props: {
                    ...context.props,
                    ...widgetConfig
                }
            }
        );
    }
};
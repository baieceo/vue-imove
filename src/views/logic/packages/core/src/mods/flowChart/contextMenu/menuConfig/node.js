import shortcuts from '../../../../common/shortcuts';
import { getSelectedNodes } from '../../../../utils/flowChartUtils';

const nodeMenuConfig = [{
        key: 'copy',
        title: '复制',
        icon: 'icon-sam icon-sam-fuzhi',
        handler: shortcuts.copy.handler,
    },
    {
        key: 'delete',
        title: '删除',
        icon: 'icon-sam icon-sam-shanchu',
        handler: shortcuts.delete.handler,
    },
    {
        key: 'rename',
        title: '编辑文本',
        icon: 'icon-sam icon-sam-bianji',
        showDividerBehind: true,
        handler() {
            // TODO
        },
    },
    {
        key: 'bringToTop',
        title: '置于顶层',
        icon: 'icon-sam icon-sam-bringtotop',
        handler: shortcuts.bringToTop.handler,
    },
    {
        key: 'bringToBack',
        title: '置于底层',
        icon: 'icon-sam icon-sam-bringtobottom',
        showDividerBehind: true,
        handler: shortcuts.bringToBack.handler,
    },
    {
        key: 'editCode',
        title: '编辑代码',
        icon: 'icon-sam icon-sam-bianji1',
        disabled(flowChart) {
            return getSelectedNodes(flowChart).length !== 1;
        },
        handler(flowChart) {
            flowChart.trigger('graph:editCode');
        },
    },
    {
        key: 'executeCode',
        title: '执行代码',
        icon: 'icon-sam icon-sam-iconset0264',
        disabled(flowChart) {
            return getSelectedNodes(flowChart).length !== 1;
        },
        handler(flowChart) {
            flowChart.trigger('graph:runCode');
        },
    },
];

export default nodeMenuConfig;
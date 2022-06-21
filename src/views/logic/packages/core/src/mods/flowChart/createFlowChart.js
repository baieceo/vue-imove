import shortcuts from '../../common/shortcuts';
import { Graph } from '@antv/x6';
import { MIN_ZOOM, MAX_ZOOM } from '../../common/const';
import baseCellSchemaMap from '../../common/baseCell';
import { getSelectedEdges } from '../../utils/flowChartUtils';
import { registerServerStorage } from './registerServerStorage';
// import MiniMapSimpleNode from '../../components/miniMapSimpleNode';

// X6 register base cell shape
Object.values(baseCellSchemaMap).forEach((schema) => {
    const { base, ...rest } = schema;

    base.define(rest);
});

const registerEvents = (flowChart) => {
    flowChart.on('node:added', (args) => {
        // console.log('node:added');
        flowChart.cleanSelection();
        flowChart.select(args.cell);
    });

    flowChart.on('selection:changed', () => {
        // console.log('selection:changed');
        flowChart.trigger('toolBar:forceUpdate');
        flowChart.trigger('settingBar:forceUpdate');
    });

    flowChart.on('edge:connected', (args) => {
        // console.log('edge:connected');
        const edge = args.edge;
        const sourceNode = edge.getSourceNode();

        if (sourceNode && sourceNode.shape === 'imove-branch') {
            const portId = edge.getSourcePortId();

            if (portId === 'right' || portId === 'bottom') {
                edge.setLabelAt(0, sourceNode.getPortProp(portId, 'attrs/text/text'));

                sourceNode.setPortProp(portId, 'attrs/text/text', '');
            }
        }
    });

    flowChart.on('edge:selected', (args) => {
        // console.log('edge:selected');
        args.edge.attr('line/stroke', '#feb663');
        args.edge.attr('line/strokeWidth', '3px');
    });

    flowChart.on('edge:unselected', (args) => {
        // console.log('edge:unselected');
        args.edge.attr('line/stroke', '#333');
        args.edge.attr('line/strokeWidth', '2px');
    });
    flowChart.on('edge:mouseover', (args) => {
        // console.log('edge:mouseover');
        args.edge.attr('line/stroke', '#feb663');
        args.edge.attr('line/strokeWidth', '3px');
    });

    flowChart.on('edge:mouseleave', (args) => {
        // console.log('edge:mouseleave');
        const { edge } = args;
        const selectedEdges = getSelectedEdges(flowChart);

        if (selectedEdges[0] !== edge) {
            args.edge.attr('line/stroke', '#333');
            args.edge.attr('line/strokeWidth', '2px');
        }
    });

    flowChart.on('node:dblclick', () => {
        // console.log('node:dblclick');
        if (flowChart.getSelectedCells()[0]['shape'] === 'imove-start') {
            alert('起始节点，不允许编写代码');
        } else {
            flowChart.trigger('graph:editCode');
        }
    });

    flowChart.on('blank:contextmenu', (args) => {
        // console.log('blank:contextmenu');
        const {
            e: { clientX, clientY },
        } = args;

        flowChart.cleanSelection();
        flowChart.trigger('graph:showContextMenu', {
            x: clientX,
            y: clientY,
            scene: 'blank',
        });
    });

    flowChart.on('node:contextmenu', (args) => {
        // console.log('node:contextmenu');
        const {
            e: { clientX, clientY },
            node,
        } = args;

        // NOTE: if the clicked node is not in the selected nodes, then clear selection
        if (!flowChart.getSelectedCells().includes(node)) {
            flowChart.cleanSelection();
            flowChart.select(node);
        }

        flowChart.trigger('graph:showContextMenu', {
            x: clientX,
            y: clientY,
            scene: 'node',
        });
    });
};

const registerShortcuts = (flowChart) => {
    Object.values(shortcuts).forEach((shortcut) => {
        const { keys, handler } = shortcut;

        flowChart.bindKey(keys, () => handler(flowChart));
    });
};

const createFlowChart = (container, miniMapContainer) => {
    const flowChart = new Graph({
        container,
        rotating: false,
        resizing: true,
        // https://x6.antv.vision/zh/docs/tutorial/basic/clipboard
        clipboard: {
            enabled: true,
            useLocalStorage: true,
        },
        // https://x6.antv.vision/zh/docs/tutorial/intermediate/connector
        connecting: {
            snap: true,
            dangling: true,
            highlight: true,
            anchor: 'center',
            connectionPoint: 'anchor',
            router: {
                name: 'manhattan',
            },
            validateConnection({
                sourceView,
                targetView,
                sourceMagnet,
                targetMagnet,
            }) {
                if (!sourceMagnet) {
                    return false;
                } else if (!targetMagnet) {
                    return false;
                } else {
                    return sourceView !== targetView;
                }
            },
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/background
        background: {
            color: '#f8f9fa',
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/grid
        grid: {
            visible: true,
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/selection
        selecting: {
            enabled: true,
            multiple: true,
            rubberband: true,
            movable: true,
            strict: true,
            showNodeSelectionBox: false,
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/snapline
        snapline: {
            enabled: true,
            clean: 100,
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard
        keyboard: {
            enabled: true,
            global: false,
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/history
        history: {
            enabled: true,
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/minimap
        minimap: {
            width: (150 * container.offsetWidth) / container.offsetHeight,
            height: 150,
            minScale: MIN_ZOOM,
            maxScale: MAX_ZOOM,
            enabled: true,
            scalable: false,
            container: miniMapContainer,
            graphOptions: {
                async: true,
                getCellView(cell) {
                    if (cell.isNode()) {
                        // return MiniMapSimpleNode;
                        return null;
                    }
                },
                createCellView(cell) {
                    if (cell.isEdge()) {
                        return null;
                    }
                },
            },
        },
        // https://x6.antv.vision/zh/docs/tutorial/basic/scroller
        scroller: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
            minScale: MIN_ZOOM,
            maxScale: MAX_ZOOM,
            modifiers: ['ctrl', 'meta'],
        },
    });

    registerEvents(flowChart);
    registerShortcuts(flowChart);
    registerServerStorage(flowChart);

    return flowChart;
};

export default createFlowChart;
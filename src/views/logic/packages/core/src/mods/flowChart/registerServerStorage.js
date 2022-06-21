import merge from 'lodash.merge';
import { parseQuery } from '../../utils';
import { modifyGraph, ActionType } from '../../api';

const { projectId } = parseQuery();
const memQueue = [];

const validate = (type, data) => {
    if (type === 'node') {
        return true;
    } else if (type === 'edge') {
        const { source, target } = data;
        return source.cell && target.cell;
    } else {
        return false;
    }
};

const enqueue = (cellType, actionType, data) => {
    if (!validate(cellType, data)) {
        return;
    }

    const foundIndex = memQueue.findIndex(
        (item) =>
        item.type === cellType &&
        item.actionType === actionType &&
        item.data.id === data.id,
    );

    if (foundIndex > -1) {
        const deleted = memQueue.splice(foundIndex, 1)[0];

        merge(deleted.data, data);
    }

    memQueue.push({ type: cellType, actionType, data });
};

let modifyActionTimer = -1;

const save = (
    flowChart,
    cellType,
    actionType,
    data,
) => {
    enqueue(cellType, actionType, data);

    clearTimeout(modifyActionTimer);

    modifyActionTimer = window.setTimeout(() => {
        const pushedActions = memQueue.slice(0);

        if (pushedActions.length > 0) {
            flowChart.trigger('graph:change:modify');

            modifyGraph(projectId, memQueue)
                .then((res) => {
                    memQueue.splice(0, pushedActions.length);

                    flowChart.trigger('graph:modified', { success: true });

                    console.log('graph:modified', res);
                })
                .catch((error) => {
                    flowChart.trigger('graph:modified', { success: true, error: error });
                });
        }
    }, 100);
};

const nodeActionEventMap = {
    [ActionType.create]: ['node:added'],
    [ActionType.remove]: ['node:removed'],
    [ActionType.update]: [
        'node:moved',
        'node:resized',
        'node:rotated',
        'node:change:ports',
        'node:change:attrs',
        'node:change:data',
        'node:change:zIndex',
    ],
};

const edgeActionEventMap = {
    [ActionType.create]: ['edge:connected'],
    [ActionType.remove]: ['edge:removed'],
    [ActionType.update]: ['edge:moved'],
};

export const registerServerStorage = (flowChart) => {
    Object.keys(nodeActionEventMap).forEach((actionType) => {
        const events = nodeActionEventMap[actionType];

        events.forEach((event) => {
            flowChart.on(event, (args) => {
                save(flowChart, 'node', actionType, args.node.toJSON());
            });
        });
    });

    Object.keys(edgeActionEventMap).forEach((actionType) => {
        const events = edgeActionEventMap[actionType];

        events.forEach((event) => {
            flowChart.on(event, (args) => {
                console.log('edge event:', event, 'args:', args);

                save(flowChart, 'edge', actionType, args.edge.toJSON());
            });
        });
    });
};
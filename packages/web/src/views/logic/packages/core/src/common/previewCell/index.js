import Vue from 'vue';
import start from './start';
import branch from './branch';
import behavior from './behavior';

const cellMap = {
    'imove-start': start,
    'imove-branch': branch,
    'imove-behavior': behavior
};

export const install = () => {
    Object.entries(cellMap).forEach(([, cell]) => {
        Vue.component(cell.name, cell);
    });
};

export default cellMap;
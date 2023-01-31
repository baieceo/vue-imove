import start from './start';
import branch from './branch';
import behavior from './behavior';

const cellSchemaMap = {
    'imove-start': start,
    'imove-branch': branch,
    'imove-behavior': behavior,
};

export default cellSchemaMap;
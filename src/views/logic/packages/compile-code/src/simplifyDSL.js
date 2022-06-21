const extractObj = (
    obj = {},
    keys = [],
) => {
    const ret = {};
    keys.forEach((key) => {
        if (obj[key]) {
            ret[key] = obj[key];
        }
    });
    return ret;
};

const simplifyDSL = (dsl) => {
    const { cells = [] } = dsl;
    return {
        cells: cells.map((cell) => {
            if (cell.shape === 'edge') {
                return extractObj(cell, ['id', 'shape', 'source', 'target']);
            } else {
                const newCell = extractObj(cell, ['id', 'shape', 'data']);
                newCell.data = extractObj(cell.data, [
                    'trigger',
                    'configData',
                    'ports',
                ]);
                return newCell;
            }
        }),
    };
};

export default simplifyDSL;
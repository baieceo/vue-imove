import makeCode from './template/runOnline';
import simplifyDSL from './simplifyDSL';
/**
 * Solution
 *
 * 1. find the source node form dsl, and if it is not imove-start,
 * then insert a vitural imove-start at first.
 *
 * 2. transform node funciton, follows should be noted:
 *    - import statement should be replaced with import('packge/from/network')
 *    - export statement should be replace with return function
 *    - each node function should be wrapped within a new function to avoid duplicate declaration global variable
 *
 * 3. assemble Logic, Context, simplyfied dsl and nodeFns map into one file
 *
 */

const INSERT_DSL_COMMENT = '// define dsl here';
const INSERT_NODE_FNS_COMMENT = '// define nodeFns here';
const INSERT_USE_CUSTOM_CODE_START = '// use custom code start';
const INSERT_USE_CUSTOM_CODE_END = '// use custom code end';
const importRegex = /import\s([\s\S]*?)\sfrom\s('|")((@\w[\w\.\-]+\/)?(\w[\w\.\-\/]+))\2/gm;
const virtualSourceNode = {
    id: 'virtual-imove-start',
    shape: 'imove-start',
    data: {
        trigger: 'virtual-imove-start',
        configData: {},
        code: 'export default async function(ctx) {\n  \n}',
    },
};

const findStartNode = (dsl) => {
    const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
    const edges = dsl.cells.filter((cell) => cell.shape === 'edge');

    if (nodes.length === 0) {
        throw new Error('Compile failed, no node is selected');
    }

    let foundEdge = null;
    let startNode = nodes[0];
    while (
        (foundEdge = edges.find((edge) => edge.target.cell === startNode.id))
    ) {
        const newSourceId = foundEdge.source.cell;
        startNode = nodes.find(
            (node) => node.id === newSourceId,
        );
    }

    if (startNode.shape !== 'imove-start') {
        dsl.cells.push(virtualSourceNode, {
            shape: 'edge',
            source: {
                cell: 'virtual-imove-start',
            },
            target: {
                cell: startNode.id,
            },
        });
        startNode = virtualSourceNode;
    }

    return startNode;
};

const getNextNode = (curNode, dsl) => {
    const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
    const edges = dsl.cells.filter((cell) => cell.shape === 'edge');

    const foundEdge = edges.find((edge) => edge.source.cell === curNode.id);
    if (foundEdge) {
        return nodes.find((node) => node.id === foundEdge.target.cell);
    }
};

const compileSimplifiedDSL = (dsl) => {
    const simplyfiedDSL = JSON.stringify(simplifyDSL(dsl), null, 2);
    return `const dsl = ${simplyfiedDSL};`;
};

const compileNodeFn = (node) => {
    const {
        data: { label, code },
    } = node;
    const newCode = code
        .replace(
            importRegex,
            (match, p1, p2, p3) => {
                return `const ${p1} = (await import('https://jspm.dev/${p3}')).default;`;
            },
        )
        .replace(/export\s+default/, 'return');

    return `await (async function() {
    ${newCode}
  }())`;
};

const compileNodeFnsMap = (dsl) => {
    const nodes = dsl.cells.filter((cell) => cell.shape !== 'edge');
    const kvs = nodes.map((node) => {
        const { id } = node;
        return `'${id}': ${compileNodeFn(node)}`;
    });

    return `const nodeFns = {\n  ${kvs.join(',\n  ')}\n}`;
};

const compile = (dsl, mockInput, options = { customCode: { 'index.js': '' } }) => {
    const startNode = findStartNode(dsl);
    const mockNode = getNextNode(startNode, dsl);

    let output = makeCode(mockNode, mockInput)
        .replace(INSERT_DSL_COMMENT, compileSimplifiedDSL(dsl))
        .replace(INSERT_NODE_FNS_COMMENT, compileNodeFnsMap(dsl))
        .replace('$TRIGGER$', startNode.data.trigger);

    const start = output.substring(0, output.indexOf(INSERT_USE_CUSTOM_CODE_START));
    const end = output.substring(output.indexOf(INSERT_USE_CUSTOM_CODE_END));

    if (options.customCode['index.js']) {
        output = start + options.customCode['index.js'] + end;
    }

    return output;
};

export default compile;
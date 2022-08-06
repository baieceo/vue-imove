import addPlugins from './addPlugins';
import simplifyDSL from './simplifyDSL';
import extractNodeFns from './extractNodeFns';
import logicTpl from './template/logic';
import indexTpl from './template/index';
import contextTpl from './template/context';

const compile = (dsl, plugins = [], options = { customCode: { 'index.js': '' } }) => {
    const output = {
        nodeFns: extractNodeFns(dsl),
        'context.js': contextTpl,
        'dsl.json': JSON.stringify(simplifyDSL(dsl), null, 2),
        'index.js': addPlugins(indexTpl, plugins, options),
        'logic.js': logicTpl,
    };
    return output;
};

export default compile;
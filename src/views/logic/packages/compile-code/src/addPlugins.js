const INSERT_IMPORT_PLUGINS_COMMENT = '// import plugins here';
const INSERT_USE_PLUGINS_COMMENT = '// use plugins here';
const INSERT_USE_CUSTOM_CODE = '// use custom code';

const addPlugins = (originalCode = '', plugins = [], options = {}) => {
    const modifiedContent = originalCode
        .replace(new RegExp(INSERT_IMPORT_PLUGINS_COMMENT), () => {
            return plugins
                .map((plugin, index) => `import plugin${index} from '${plugin}';`)
                .join('\n');
        })
        .replace(new RegExp(INSERT_USE_PLUGINS_COMMENT), () => {
            return plugins.map((_, index) => `logic.use(plugin${index});`).join('\n');
        })
        .replace(new RegExp(INSERT_USE_CUSTOM_CODE), () => {
            return options.customCode['index.js'] || '';
        });
    return modifiedContent;
};

export default addPlugins;
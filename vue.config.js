const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
    devServer: {
        port: 8888
    },
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
});
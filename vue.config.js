const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
});
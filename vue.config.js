const port = 6100;

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        compress: true, // 指定要使用的主机。
        hot: true,// 启用webpack的热模块替换功能：
        hotOnly: true,// 在没有页面刷新的情况下启用热模块替换
        host: '0.0.0.0',
        port: port,
        open: true,
        proxy: {
            '/api': {
                target: `http://localhost:${port}`,
                changeOrigin: true,
                pathRewrite: {'^/api': ''},
            },
        },
        before: require('./src/mock/mock-server.js'),
    },
};
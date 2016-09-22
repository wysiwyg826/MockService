/**
* @Author: PiNgFan826
* @Date:   2016-08-22 17:53
* @Last modified by:   PiNgFan826
* @Last modified time: 2016-08-23 09:09
*/


var webpack = require('webpack')
var path = require('path')

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'index');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        app: APP_PATH
    },
    output: {
        path: BUILD_PATH,
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015'],
            exclude: /node_modules/
        }]
    }
};

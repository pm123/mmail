/*
* @Author: pm
* @Date:   2017-07-18 14:58:21
* @Last Modified by:   Dell
* @Last Modified time: 2017-07-22 15:16:23
*/

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

//环境变量配置. dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
	return {
		template: './src/view/'+ name +'.html',
    	filename: 'view/'+ name +'.html',
    	title: title,
        inject: true,
    	hash: true,
    	chunks: ['common', name]
	}
}

//webpack config
var config = {
    entry: {    //js的入口文件
    	'common' : ['./src/page/common/index.js'],
    	'index'  : ['./src/page/index/index.js'],
        'login'  : ['./src/page/login/index.js'],
    	'result' : ['./src/page/result/index.js']
    },
    output: {   //js的目标文件
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: { //外部依赖的声明
    	'jquery': 'window.jQuery'
    },
    module: {   // 各种loaders
	    loaders: [
	    	////test属性，用正则表达式判断文件的扩展名是不是CSS
	    	{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
	    	{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
	    	{ test: /\.string$/, loader: 'html-loader'}
	    ]
	},
	resolve: {
		alias: {
			node_modules: path.join(__dirname, 'node_modules'),
			page: path.join(__dirname, 'src/page'),
			service: path.join(__dirname, 'src/service'),
			util: path.join(__dirname, 'src/util'),
			image: path.join(__dirname, 'src/image'),
		}
	},
    plugins: [ //插件
    	//独立通用模块到js/base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name: 'common',
    		filename: 'js/base.js'
    	}),
    	//把css单独打包到文件里
    	new ExtractTextPlugin("css/[name].css"),
    	//html模块的处理
    	new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    	new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]	
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
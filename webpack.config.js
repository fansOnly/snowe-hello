/* eslint-disable no-undef */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].chunk.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.scss', '.css'], // 当通过import login from './login/index'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
		mainFiles: ['index'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件
		alias: { // 配置别名可以加快webpack查找模块的速度
			'@': path.resolve(__dirname, 'src'),
			'_c': path.resolve(__dirname, 'src/components'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.(js|jsx?)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test:/\.(jpg|jpeg|png|gif|svg)$/,
				//小于1024的图片都用base64的方式加载
				use: [{
						loader: 'url-loader',
						options: {
							name: '[name]_[hash].[ext]',
							limit: 204800,
							outputPath: 'images/',
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true
						}
					}
				]
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'vue-test',
			template: 'public/index.html',
			hash: true, // 会在打包好的bundle.js后面加上hash串
		}),
	],
}

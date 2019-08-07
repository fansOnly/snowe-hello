/* eslint-disable no-undef */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

console.log('=======process.env.NODE_ENV=======', process.env.NODE_ENV);

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].chunk.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: './',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.css', '.less'], // 当通过import login from './login/index'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
		mainFiles: ['index'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件
		alias: { // 配置别名可以加快webpack查找模块的速度
			'@': path.resolve(__dirname, 'src'),
			'_c': path.resolve(__dirname, 'src/components'),
			'_v': path.resolve(__dirname, 'src/views'),
			'_u': path.resolve(__dirname, 'src/utils'),
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
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					},
				]
			},
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			// {
			// 	test: /\.(le|sc|c)ss$/,
			// 	use: [
			// 		{
			// 			loader: process.env.NODE_ENV === 'development' ? 'vue-style-loader' : MiniCssExtractPlugin.loader
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2
			// 			}
			// 		},
			// 		'less-loader',
			// 		'postcss-loader',
			// 	]
			// },
			{
				test: /\.(png|jpg|gif|svg|ico|eot|ttf|woff|woff2)$/,
				//小于100k的图片都用base64的方式加载
				use: [{
						loader: 'url-loader',
						options: {
							name: '[name]_[hash].[ext]',
							limit: 102400,
							outputPath: 'images/',
						}
					}
				]
			},
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack',
			template: './public/index.html',
			hash: true, // 会在打包好的bundle.js后面加上hash串
			favicon: path.resolve('./public/favicon.ico'),
		}),
	],
}

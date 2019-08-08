/* eslint-disable no-undef */
const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('=======process.env.NODE_ENV=======', process.env.NODE_ENV);

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	entry: './src/main.js',
	output: {
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].chunk.js',
		path: path.resolve(__dirname, './dist'),
		// publicPath: '',
	},
	resolve: {
		// 当通过import login from './login/index'形式引入文件时，会先去寻找.js为后缀当文件，再去寻找.jsx为后缀的文件
		extensions: ['.js', '.jsx', '.scss', '.sass', '.css', '.less'], 
		// mainFiles: ['index'], // 如果是直接引用一个文件夹，那么回去直接找index开头的文件
		alias: { // 配置别名可以加快webpack查找模块的速度
			'@': path.resolve(__dirname, 'src'),
			'_c': path.resolve(__dirname, 'src/components'),
			'_v': path.resolve(__dirname, 'src/views'),
			'_u': path.resolve(__dirname, 'src/utils'),
		}
	},
	// devtool: false,
	devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
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
			{
				test: /\.(le|sa|sc|c)ss$/,
				use: [
					devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.(png|jpg|gif|svg|ico|eot|ttf|woff|woff2)$/,
				use: [{
						loader: 'url-loader',
						options: {
							name: '[name]_[hash].[ext]',
							limit: 102400, //小于100k的图片都用base64的方式加载
							outputPath: 'assets/images/',
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
		new MiniCssExtractPlugin({
			filename: devMode ? 'assets/style/[name].css' : 'assets/style/[name].[hash:8].css',
			chunkFilename: devMode ? 'assets/style/[id].css' : 'assets/style/[id].[chunkhash:8].css',
		}),
		// new webpack.SourceMapDevToolPlugin({
		// 	filename: 'sourcemaps/[name].js.map',
		// 	exclude: ['vendors.js'],
		// 	module: false,
		// 	columns: false,
		// }),
		new CleanWebpackPlugin(),
		new ManifestPlugin(),
	],
}

const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./webpack.config.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(config, {
	mode: 'production',
	output: {
		filename: 'js/[name].[contenthash:8].js',
		chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
		pathinfo: false,
	},
	// devtool: 'cheap-module-source-map',
	module: {
		rules: [
			// {
			// 	test: /\.(le|sc|c)ss$/,
			// 	use: [
			// 		{
			// 			loader: MiniCssExtractPlugin.loader,
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2
			// 			}
			// 		},
			// 		'postcss-loader',
			// 		'less-loader',
			// 	]
			// },
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
				cache: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial',
				},
				common: {
					name: 'common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		// new MiniCssExtractPlugin({
		// 	filename: devMode ? 'assets/style/[name].css' : 'assets/style/[name].[hash:8].css',
		// 	chunkFilename: devMode ? 'assets/style/[id].css' : 'assets/style/[id].[chunkhash:8].css',
		// }),
		// wepack4.0兼容性问题
		// new CSSSplitWebpackPlugin({
		// 	size: 4000,
		// 	filename: 'assets/style/[name]-[part].[ext]'
		// }),
		// 注意一定要在HtmlWebpackPlugin之后引用
		new ScriptExtHtmlWebpackPlugin({
			//`runtime` must same as runtimeChunk name. default is `runtime`
			inline: /runtime~main\..*\.js$/
		}),
		// new BundleAnalyzerPlugin(),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: true
		}),
	]
})

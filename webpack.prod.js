const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default

module.exports = merge(config, {
	mode: 'production',
	output: {
		filename: "'js/[name].[contenthash:8].js'",
		chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
		pathinfo: false,
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'sass-loader',
					'postcss-loader',
				]
			},
		]
	},
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin({})
		],
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				},
				default: {  // 为非node-modules库中分割出的代码设置默认存放名称
					priority: -20,
					reuseExistingChunk: true, // 避免被重复打包分割
					name: 'common'
				}
			}
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.HashedModuleIdsPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].[chunkhash:8].css',
		}),
		new CSSSplitWebpackPlugin({
			size: 4000,
			filename: '[name]-[part].[ext]'
		})
	]
})

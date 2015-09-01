var pkg = require("./package.json");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path = require("path");

module.exports = {

	entry: {
		js: "./src/index.jsx",
		html: "./src/index.html",
	},

	output: {
		filename: pkg.name + ".js",
		path: "./build"
	},

	module: {
		loaders: [

			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [
					"react-hot",
					"babel?optional[]=es7.decorators&optional[]=es7.classProperties"
				]
			},

			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: "file",
				query: {
					name: "[name].[ext]"
				}
			},

			{
				test: /\.less$/,
				exclude: /node_modules/,
				loader: process.env.NODE_ENV !== "production" ? "style!css!autoprefixer!less" : ExtractTextPlugin.extract("css!autoprefixer!less")
			},

			{
				test: /\.css$/,
				loader: process.env.NODE_ENV !== "production" ? "style!css!autoprefixer" : ExtractTextPlugin.extract("css!autoprefixer")
			},

			{
				test: /\.svg$/,
				loader: "raw!image-webpack"
			}

		]
	},

	resolve: {
		extensions: [
			"",
			".js",
			".jsx",
			".less"
		]
	},

	plugins: [

		new ExtractTextPlugin(pkg.name + ".css", {
			allChunks: true
		})

	]

};

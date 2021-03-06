var webpack = require("webpack");
module.exports = {
	devtool: "source-map",
	entry: __dirname + "/main.js",
	output: {
		path: __dirname + "/common",
		filename: "mained.js"
	},
	resolve: {
		alias: {  
            vue: 'vue/dist/vue.js',
            'muse-components': 'muse-ui/src'  
        },  
	},
	module: {
		//加载器
		loaders: [{
			//cnpm install babel-loader
			//cnpm install babel-core babel-preset-es2015 //安装babel  实现 ES6 到 ES5
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}, {
			//cnpm install html-loader
			test: /\.html$/,
			loader: "html-loader"
		}, {
			//cnpm install vue-loader vue-template-compiler
			test: /\.vue$/,
			loader: "vue-loader"
		}, {
			//cnpm install css-loader style-loader
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}, {
			//cnpm install sass-loader node-sass
			test: /\.scss$/,
			loader: "sass-loader"
		}, {
			//cnpm install url-loader
			test: /\.(jpg|png|gif|jpeg)$/,
			loader: "url-loader"
		}, {
			//cnpm install file-loader
			test: /\.(ttf|svg|woff|eot)$/,
			loader: "file-loader"
		},
		{
       		 test: /muse-ui.src.*?js$/,
       		 loader: 'babel'
    	}
      ]
	},
	devServer: {
		//服务器文件夹
		contentBase: './common',
		//实时更新
		inline: true
	},
	plugins: [
		//代码压缩
		//new webpack.optimize.UglifyJsPlugin()
	]
}
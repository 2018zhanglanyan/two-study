const path = require('path');

module.exports = {
	// 指定打包环境
	mode:'production',
	// 指定入口
	entry: './src/index.js',
	// 指定出口
	output: {
		// 出口文件名称
		filename: 'bundle.js',
		// 出口文件所在的目录
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			// 处理css文件
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			//处理图片 
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
				  			limit: 1000
						}
					}
				]
			}
		]
	}
};
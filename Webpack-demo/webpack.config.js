const path=require('path')
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports={
     mode:"production",
     devtool:"inline-source-map",
     entry:{
         "index":'./src/index.js'
     },
     output:{
         path:path.resolve(__dirname,'./dist'),
         filename:"[name].js"
     },
 
     module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                // 如果loader需要配置，需要使用对象形式
                use: {
                    // 要加载的loader
                    // loader: 'file-loader',
                    loader: 'url-loader',
                    // loader的配置
                    options: {
                        // placeholder 占位符 [name] 源资源模块的名称 [ext] 源资源模块的后缀
                        name: "[name]_[hash].[ext]",
                        //打包后的存放位置
                        outputPath: "./images",
                        // 打包后文件的 url,需要引用图片需要回退到根目录，但是调用者现在在dist/html中
                        publicPath: '/images',
                        // 小于 100 字节转成 base64 格式
                        limit: 100
                    }
                }
            },

            {
                test: /\.css$/,
                use: [
                    // 如果有多个loader，执行顺序是从后到前
                    // "style-loader",
                    //注意style-loader要在mini-css-extract-plugin之后执行
                    {
                        loader:MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            // 启用/禁用 url() 处理
                            url: true,
                            // 启用/禁用 @import 处理
                            import: true,
                            // 启用/禁用 Sourcemap
                            sourceMap: false
                        }
                    },

                ]
            }
        ]
    },
    plugins:[
        //每次重新运行都清除通过webpack生成的文件
        new CleanWebpackPlugin(),
        //通过模块引入的方式加载HTML文件
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./html/index.html"
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name].css"
        })
    ],
    devServer: {
        //就是把public存放的路径也作为一个根路径
        contentBase:"./public",

        //开启热更新
        hot:true,
        //如果不开hotOnly那么就会刷新页面
        hotOnly:true,
        proxy:{

            '/api':{
                //域名解析规则，之前我们在前端请求的在8080端口请求http://localhost:9999/api/getUser的数据跨越了
                //所以我们在后端来处理一下，利用poxy代理
                target:'http://localhost:9999',
                //路径重写规则，例如，前端用/api来开头，但是后端没有/api/getUser这个接口这时候我们就可以利用路径转发规则来
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}
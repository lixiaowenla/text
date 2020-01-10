const path = require('path');

const HtmlPlugin=require('html-webpack-plugin');

const ExtractTextPlugin=require('extract-text-webpack-plugin');

const glob=require('glob');
const PurifyCSSPlugin=require("purifycss-webpack");

const webpack=require('webpack');

const copyWebpackPlugin=require('copy-webpack-plugin');

module.exports= {
    mode:'development',
    entry:{
        index:'./src/index.js',
    },

    output:{
        path:path.resolve(__dirname,'dist'),

        filename:'[name].js',
        publicPath:'http://localhost:8089/'
    },

    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8089,
        open:true,
    },

    plugins:[
        new HtmlPlugin({
            filename:'index.html',
            title:'标题',
            chunks:['index'],
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new ExtractTextPlugin("css/index.css"),
        new PurifyCSSPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html')),
        }),
        new webpack.BannerPlugin('别吵吵'),
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new copyWebpackPlugin([{
            from:__dirname+'/src/public',
            to:'./public'
        }])
    ],

    module:{
        rules:[{
            test:/\.css$/,
           // use:['style-loader','css-loader']
           use:ExtractTextPlugin.extract({
               fallback:"style-loader",
               use:[{
                   loader:"css-loader",
                   options:{imporyLoaders: 1}
           },'postcss-loader']
        })
        },
        {
            test:/\.(png|gif|jpg|jpeg)/,
            use:[{
                loader:'url-loader',
                options:{
                    limit:500,
                    outputPath:'images/'
                },
               
            }]
        },
        {
            test:/\.(html|htm)$/i,
            loader:'html-withimg-loader'
        },
        {
            test:/\.scss$/,
           // use:['style-loader','css-loader','sass-loader']
           use:ExtractTextPlugin.extract({
            fallback:"style-loader",
            use:['css-loader','sass-loader'],
        })
        },
        {
            test:/\.js$/,
            use:[{
                loader:'babel-loader',
                options:{
                    preseets:['@babel/preset-env']
                }
            }],
            exclude:/node_modules/
        }
    ]
    }

}
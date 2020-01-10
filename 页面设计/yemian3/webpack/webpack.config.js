const path=require('path');

const HtmlPlugin=requir('html-webpack-plugin');


module.exports={
    mode:'development',
    entry:{
        index:'./src/index.js',
        index1:'./src/index1.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8090,
        open:true,
    },
    plugin:[
        new HtmlPlugin({
            filename:'a.html',
            title:'index1-title',
            chunks:['index11'],
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        })

         new HtmlPlugin({
        filename:'b.html',
        title:'index2-title',
        chunks:['index22'],
        minify:{
            removeAttributeQuotes:true
        },
        template:'./src/index2.html',
        hash:true
        }),
        new ExtractTextPlugin("css/index.css")
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                )}
            }
        ]
    },

   

}


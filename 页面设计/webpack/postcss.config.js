module.exports={
    plugins:[
        require('autoprefixer')({
            "browsers":[
                "defaults",
                "not ie<11",
                "last 2 versions",
                "> 1%",
                "ios 7",
                "last 3 ios version"
            ]
        })
    ]
};
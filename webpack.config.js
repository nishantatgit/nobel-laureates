const console = require("better-console");
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template : "./src/index.html",
    filename : "./index.html"
});
require('dotenv').config();

const commonConfig = merge([{
    module : {
        rules : [
            {
                test : "/\.js/",
                exclude : "/node_modules/",
                use : {

                    loader : "babel-loader"
                }
            }
        ]
    },
    plugins : [ htmlPlugin]
}]);

const devConfig = merge([
     parts.devServer({ host : process.env.HOST, port : process.env.PORT})
]);

const prodConfig = merge([]);


module.exports = mode => {
    if(mode === "production"){
        let config = merge( commonConfig, prodConfig, mode);
        console.log("production configurations " , config.module.rules);
        return config;
    }
    let config = merge (commonConfig, devConfig, mode);
    console.log("development configurations ", config.module.rules);
    return config;

}
/*module.exports = {
    devServer : {
        stats : "errors-only",
        host : process.env.HOST,
        port : process.env.PORT,
        open : true,
        overlay : true
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test : /\.scss$/,
                exclude : /node_modules/,
                use : ["style-loader" , "css-loader" , "sass-loader"]
            }
        ],
    },
    plugins : [ htmlPlugin ]
}*/

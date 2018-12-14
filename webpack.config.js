// const util = require("util");  // uncomment for debugging
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
                test : /\.js$/,
                exclude : /node_modules/,
                use : {

                    loader : 'babel-loader',
                }
            }
        ]
    },
    plugins : [ htmlPlugin ]
}]);

const devConfig = merge([
     parts.devServer({ host : process.env.HOST, port : process.env.PORT}),
     parts.loadCSS({}),
     parts.loadSVGSprite({extract : false})
]);

const prodConfig = merge([
    parts.extractCSS({
        use : [ 'css-loader', 'sass-loader']
    }),
    parts.loadSVGSprite({ extract : true , publicPath : '/', plainSprite : true})
]);


module.exports = mode => {
    if(mode === "production"){
        return merge(commonConfig, prodConfig, {mode})
    /* below code is used for debugging prupose     
        let config = merge( commonConfig, prodConfig, {mode});
        console.log("production configurations ", seperator);
        console.log(util.inspect(config, { showHidden : false, depth : null}));
        return config;
    */
    }
    return merge(commonConfig, devConfig, {mode})
    /* below code is used for debugging purpose
    let config = merge (commonConfig, devConfig, {mode});
    console.log("production configurations ", seperator);
    console.log(util.inspect(config, {showHidden : false , depth : null}));
    return config;
    */

}


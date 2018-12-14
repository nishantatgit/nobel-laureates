console.log('webpack parts js ');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SVGSpriteLoaderPlugin = require("svg-sprite-loader/plugin");
module.exports = {
    devServer : ({host , port }= {}) => ({
        devServer :  {
            host,
            port,
            stats : "errors-only",
            open : true,
            overlay : true
        }
    }),
    loadCSS : ({include,exclude = /node_modules/}) => ({
        module : {
            rules : [
                {
                    test : /.scss$/,
                    exclude,
                    use : ["style-loader", "css-loader", "sass-loader"]
                }
            ]
        } 
    }),
    extractCSS : ({include, exclude = /node_modules/ , use = [] }) => {
        const plugin = new MiniCssExtractPlugin({
            filename : '[name].css'
        });
        return {
            module : {
                rules : [
                    {
                        test : /\.scss$/,
                        exclude,
                        use : [
                            MiniCssExtractPlugin.loader
                        ].concat(use)
                    }
                ]
            },
            plugins : [plugin]
        }
    },
    loadSVGSprite : ({exclude, extract = false , publicPath, plainSprite } = {} ) => {
        const plugin = new SVGSpriteLoaderPlugin({ plainSprite});
        return {
            module : {
                rules : [
                    {
                        test : /\.svg$/,
                        exclude,
                        use : [{
                            loader : 'svg-sprite-loader',
                            options : {
                                extract,
                                publicPath
                            } 
                        }]
                    }
                ]
            },
            plugins : [plugin]
        }
    }
}
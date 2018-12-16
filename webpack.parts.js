const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpriteLoaderPlugin = require('svg-sprite-loader/plugin');
module.exports = {
    devServer : ({host , port }= {}) => ({
        devServer :  {
            host,
            port,
            stats : 'errors-only',
            open : true,
            overlay : true
        }
    }),
    loadHtml : () => ({
                    module : {
                        rules : [
                            {
                                test : /\.html$/,
                                use : [ 
                                        {
                                            loader : 'file-loader',
                                            options : {
                                                            name : '[name].html'
                                                    }
                                        },
                                        {
                                            loader : 'extract-loader'
                                        },
                                        {
                                            loader : 'html-loader'
                                        }
                                ]        
                            }
                        ]
                    }
                }),
    loadCSS : ({include,exclude = /node_modules/}) => ({
        module : {
            rules : [
                {
                    test : /.scss$/,
                    exclude,
                    use : [  {
                        loader : 'tee-loader',
                        options : {
                            label : 'after-style-loader-plugin'
                        }
                    },'style-loader',  {
                        loader : 'tee-loader',
                        options : {
                            label : 'before-style-loader-plugin'
                        }
                    },'css-loader', 'sass-loader']
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
            plugins : [plugin],
        }
    },
    extractCSS2 : () => ({
        module : {
            rules : {
                test : /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                    }
                ]
            }
        }
    }),
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
console.log('webpack parts js ');

module.exports = {
    devServer : ({host , port }= {}) => ({
        devServer :  {
            host,
            port,
            stats : "errors-only",
            open : true,
            overlay : true
        }
    }) 
}
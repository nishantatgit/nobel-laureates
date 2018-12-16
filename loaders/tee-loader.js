const loaderUtils = require('loader-utils');

module.exports = function(source){
    const options = loaderUtils.getOptions(this);
    console.groupCollapsed(`[tea-loader-${options.label}] :  ${this.resource}`);
    console.log(source);
    console.groupEnd();
    return source;
}
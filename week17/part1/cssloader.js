let css = require('css');

module.exports = function(source, map){
    let stylesheet = css.parse(source);

    //在调试中该处提取名称失败，提取的是整个路径
    // let name = this.resourcePath.match(/([^/]+).css$/)[1];
    //修改如下后，调试成功
    let name = this.resourcePath.match(/.+\\([^/]+).css$/)[1];
    console.log(this.resourcePath);

    for(let rule of stylesheet.stylesheet.rules){
        rule.selectors = rule.selectors.map(sel => 
            sel.match(new RegExp(`^.${name}`)) ? sel :
            `.${name} ${sel}`
        );

    }

    return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))};
    document.documentElement.appendChild(style);
    `;
}
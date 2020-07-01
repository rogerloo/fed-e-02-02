// 每个loader都需要导入资源 导出一个函数（对资源的处理过程）

const marked = require('marked')

module.exports = source => {
    const html = marked(source)
    // 必须return出一个js代码或者非js代码但是需要额外的loader去处理
    // 1. js代码
        // return `module.exports = ${JSON.stringify(html)}` module.exports
        // return `export default ${JSON.stringify(html)}`  export default
    // 2. 非js代码 例如return出html代码，再交由html-loader处理
    return html
}
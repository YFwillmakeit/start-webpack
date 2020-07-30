// 自定义一个：清除打包后js文件的注释 的插件
const RCP = 'RemoveCommentsPlugin'; // 定义成常量，便于复用
class RemoveCommentsPlugin{
  apply(compiler){ // compiler包含了此次构建的所有配置信息
    compiler.hooks.emit.tap(RCP,compilation => { // compilation为此次打包的上下文
      for (const name in compilation.assets) { // name是文件名称
        console.log(name);
        if(name.endsWith('.js')){
          const contents = compilation.assets[name].source(); // 获取文件内容
          const noComments = contents.toString().replace(/\/\*{2,}\/\s?/g,'');
          compilation.assets[name] = {
            source: () => noComments, // 返回新的内容
            size: () => noComments.length // 返回新内容的大小
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin; // 把类（构造函数）暴露出去

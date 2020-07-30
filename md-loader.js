const marked = require('marked');
module.exports = source => {
  const html = marked(source);
  console.log(html);
  const code = `export default ${JSON.stringify(html)}`;
  return code
  // return 'console.log(JSON.stringify(html))'
}

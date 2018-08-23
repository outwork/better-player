const viewFolder = './src/view/';
const jsFolder = './src/js/';
const fs = require('fs');

// read original file
var code = fs.readFileSync('./src/index.html', 'utf8');

// add the views
var views = ''
fs.readdirSync(viewFolder).forEach(file => {
  var contents = fs.readFileSync(viewFolder+file, 'utf8');
  views += '<script id="'+file+'" type="text/html">'+contents+'</script>'
})
code = code.replace('@@VIEWS@@', views)

// add the javascript
var scripts = ''
fs.readdirSync(jsFolder).forEach(file => {
  var contents = fs.readFileSync(jsFolder+file, 'utf8');
  scripts += contents+'\n'
})
code = code.replace('@@SCRIPTS@@', scripts)
fs.writeFileSync('./dist/index.html', code);
console.log('Succesfully built')
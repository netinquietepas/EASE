var fs = require('fs'); //fs모듈 활용하긔
console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
fs.readFile('sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');

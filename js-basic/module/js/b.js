// define('./js/b', function (require, exports, module) {
//     var a = require('./a');
//     var b = a + 1;
//     module.exports = b;
// });
define('./js/b', function (require, exports, module) {
    return { c: 3, d: 4 }
});
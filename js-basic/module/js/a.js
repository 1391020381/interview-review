// define('./js/a', function (require, exports, module) {
//     var a = 1;
//     require.async('./b', function (b) {
//         a = b + 1;
//         module.exports = a; //a= 3
//     });
//     module.exports = a; // a= 1
// });
define('./js/a', function (require, exports, module) {
    return { a: 1, b: 2 }
});
(function (modules) {


    function __webpack_require__(moduleId) {
        var module = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }

    return __webpack_require__(0);
})([
    (function (module, __webpack_exports__, __webpack_require__) {
        // module = {
        //     i:0,
        //     l:false,
        //     exports:{}
        // }
        // return module.exports
        // 引用 模块 1
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__c__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["default"] = ('a.js');
        console.log(__WEBPACK_IMPORTED_MODULE_0__c__["a" /* default */]);

    }),
    (function (module, __webpack_exports__, __webpack_require__) {

        // 输出本模块的数据
        "use strict";
    /* harmony default export */ __webpack_exports__["a"] = (333);

        // module = {
        //     i: 1,
        //     l: false,
        //     exports: {
        //         a: console.log(333)
        //     }
        // }
    })
]);

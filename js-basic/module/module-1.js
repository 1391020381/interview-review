(function (window, $) {
    var data = 'data';
    function foo() {
        console.log(`foo executing,data is ${data}`)
        console.log($)
    }
    function bar() {
        data = 'modified data';
        console.log(`bar executing,data is now ${data}`)
    }
    window.module1 = { foo, bar }
})(window, jQuery)
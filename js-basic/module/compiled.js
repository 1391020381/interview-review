// browser-unpack  打包  mian.js

[
    {
        "id": 1,
        "source": "module.exports = function(x) {\n  console.log(x);\n};",
        "deps": {}
    },
    {
        "id": 2,
        "source": "var foo = require(\"./foo\");\nfoo(\"Hi\");",
        "deps": { "./foo": 1 },
        "entry": true
    }
]
const path = require('path')
const fs = require('fs')
const vm = require('vm')

// 定义Module
function Module(id) {
    this.id = id
    this.filename = id
    this.exports = {}
    this.loaded = false
}

// 定义拓展与解析规则
Module._extensions = Object.create(null)

Module._extensions['.json'] = function (module) {
    return Module.exports = JSON.parse(fs.readFileSync(module.filename, 'utf8'))
}

Module._extensions['.js'] = function (module) {
    Module._compile(moudle)
}

// 包装函数
Module.wrap = function (script) {
    return Module.wrapper[0] + script + Module.wrapper[1];
};

Module.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
];

// 编译执行
Module._compile = function (module) {
    const content = fs.readFileSync(module.filename, 'utf8'), filename = module.filename;
    const wrapper = Module.wrap(content)

    const compiledWrapper = vm.runInThisContext(wrapper, {
        filename: filename,
        lineOffset: 0,
        displayErrors: true,
    })

    const result = compiledWrapper.call(module.exports, module.exports, require, module, filename, dirname);

    return result
}

// 缓存
Module._cache = Object.create(null)

Module.prototype.load = function (filename) {
    let extname = path.extname(filename)
    Module._extensions[extname](this);
    this.loaded = true;
}

// 加载
Module._load = function (filename) {
    const cacheModule = Module._cache[filename]

    if (cacheModule) {
        return cacheModule.exports
    }

    let module = new Module(filename)
    Module._cache[filename] = module

    module.load(filename)

    return module.exports
}

// 简单的路径解析
Module._resolveFilename = function (path) {
    let p = path.resolve(path)
    if (!/\.\w+$/.test(p)) {
        let arr = Object.keys(Module._extensions)
        arr.forEach(item => {
            let file = `${p}${item}`
            try {
                fs.accessSync(file)
                return file
            } catch (e) {
                // ...
            }
        })
    } else {
        return p
    }
}

// require 函数
function require(path) {
    const filename = Module._resolveFilename(path)
    return Module._load(filename)
}

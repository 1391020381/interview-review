// iframe eval
// eval 是 js的和一个内置函数,它可以直接执行一段字符串代码,并返回执行结果。
// with 语句可以将一个对象添加到作用域链的顶层，并且允许在代码块中省略掉该对象的引用。通过它可以创建一个独立的上下文，更好地满足执行代码片段的逻辑是无污染的
var code = "console.log('Hello,world!')"
eval(code)

// 1. eval 执行 立即执行函数
// 2. 立即执行函数  通过 with 注入外部依赖
// 3. 在 with 返回 code
// 此时 code的 作用域就改变

var global = {a:1,b:2};
var testA =  eval(`
      (() => {
        with (global) { 
          return (${function test(){
            //   console.log(window.a)
              console.log(global.a)
              console.log(global.b)
          }})
        }
      })()
    `);
testA()   


// Function: Function 是 js中的内置对象,它可以将一个字符串转化为一个函数,并执行该函数。

var code = "console.log('Hello,world!')"
var func = new Function(code)
func()

// 兼容性
// 安全性  eval 函数的使用存在安全风险,可能导致XSS漏洞。建议将整个上下文收敛到沙盒中，用于避免用户操作非法代码造成安全问题；


// banner inputSearch list
// pageContainer -> viewEvent -> fn(state)    ->   fnComponent props.viewEvent  -> useEffect((props.viewEvent),[])
// banner  表单 url link  
// inputSearch  desc  -> fn
// list -> state  scroll
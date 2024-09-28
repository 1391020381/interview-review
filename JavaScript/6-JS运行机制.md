* 变量 函数  声明 赋值  
* 变量提升是 js执行引擎把变量的声明部分和函数的声明部分提升到代码开头的行为。变量提升后会设置默认值 undefined
* ![JavaScript 的执行流程图](https://static001.geekbang.org/resource/image/64/1e/649c6e3b5509ffd40e13ce9c91b3d91e.png?wh=1142*203)
* ![js执行流程细化图](https://static001.geekbang.org/resource/image/06/13/0655d18ec347a95dfbf843969a921a13.png?wh=1142*634)
* 编译后会生成两部分内容: 执行上下文和可执行代码
* 执行上下文就是 执行一段代码的运行环境。 
* 代码中出现相同的变量或者函数怎么办？
    - 一段代码如果定义了两个相同名字的函数，那么最终生效的是最后一个函数   函数相同 最终生效的是最后一个。
    - 同名变量和函数的两点处理原则：
    - 1:如果是同名的函数，JavaScript编译阶段会选择最后声明的那个。
    - 2:如果变量和函数同名，那么在编译阶段，变量的声明会被忽略

* 以下情况 一段代码 才会在执行之前就进行编译并创建执行上下文。
    - 全局代码  全局执行上下文  且只有一份
    - 函数上下文   执行完被销毁
    - 使用eval函数的时候，eval的代码也会被编译，并创建执行上下文。   


   # 块级作用域

```
function foo(){
    var a = 1
    let b = 2
    {
      let b = 3
      var c = 4
      let d = 5
      console.log(a)
      console.log(b)
    }
    console.log(b) 
    console.log(c)
    console.log(d)
}   
foo()


``` 
 * ![刚执行时foo函数的执行上下文](https://static001.geekbang.org/resource/image/f9/67/f9f67f2f53437218baef9dc724bd4c67.png?wh=1142*647)
 
 * 函数内部通过 var声明的变量,在编译阶段全都被存放到变量环境里面了
 * 通过 let 声明的变量 在编译阶段会被存放在 词法环境 中
 * 在函数的作用域块内部，通过let声明的变量并没有被存放到词法环境中。
 * 当进入函数的作用块时,作用域块中通过 let声明的变量,会被存放在词法环境的一个单独的区域中，并不影响作用域块外面的变量。 比如和外部  b隔离。

 * 在词法环境内部，维护了一个小型栈结构，栈底是函数最外层的变量，进入一个作用域块后，就会把该作用域块内部的变量压到栈顶；当作用域执行完成之后，该作用域的信息就会从栈顶弹出，这就是词法环境的结构。需要注意下，我这里所讲的变量是指通过 let 或者 const 声明的变量。
 
 * 其实在每个执行上下文的变量环境中呢,都包含了一个外部引用,用来指向外部的执行上下文,我们把这个外部引用称为 outer。如果js引擎会继续在outer所指向的执行上下文中查找。
 # 词法作用域
 * 词法作用域就是作用域是由代码中函数声明的`位置`来决定的,所以词法作用域是静态的作用域,通过它就能够预测代码在执行过程中如何查找标识符。
 * js作用域链是由词法作用域决定的,词法作用域是代码编译阶段就决定好的,和函数是怎么调用的没有关系。


 ```
function bar() {
    var myName = "极客世界"
    let test1 = 100
    if (1) {
        let myName = "Chrome浏览器"
        console.log(test)
    }
}
function foo() {
    var myName = "极客邦"
    let test = 2
    {
        let test = 3
        bar()
    }
}
var myName = "极客时间"
let myAge = 10
let test = 1
foo()


 ```

 * ![块级作用域中是如何查找变量的](https://static001.geekbang.org/resource/image/25/a7/25053af5ae30c8be991fa14631cde0a7.png?wh=1142*634)

 # 闭包
 * 在 JS中，根据词法作用域的规则,内部函数总是可以访问其外部函数声明的变量,当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了,但是内部函数引用外部函数的变量依然保存在内部呢中,我们就把这些变量的集合称为闭包。

 * 通常 如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭。但如果这个闭包以后不再使用的话,就会造成内存泄漏。
 * 如果引用闭包的函数是个局部变量，等函数销毁后,在下次js引擎执行垃圾回收时,判断闭包这块内容如果已经不在被使用了,那么js引擎的垃圾回收器就会回收这块内存。


 ```

var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }    
}
function foo() {
    let myName = "极客时间"
    return bar.printName
}
let myName = "极客邦"
let _printName = foo()
_printName()
bar.printName()


 ```

 # this
 * ES6中箭头函数并不会创建其自身的执行上下文,所以箭头函数中的this 取决于它的外部函数。

 1. 当函数作为对象的方法调用时,函数中的this就是该对象
 2. 当函数被正常调用时,在严格模式下， this值时 undefined,非严格模式下 this指向的是全局对象 window；
 3. 嵌套函数中的this 不会继承外层函数的this值。


 * ![执行上下文中的 this](https://static001.geekbang.org/resource/image/b3/8d/b398610fd8060b381d33afc9b86f988d.png?wh=1142*615)

 * 全局执行上下文
 * 函数执行上下文
 * eval执行上下文
 * call apply bind
 * 对象调用函数
 * 箭头函数
 * 构造函数
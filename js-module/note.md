* [前端模块化的前世今生](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651235016&idx=1&sn=d8f63fb59a760720cc40bd569c4754cf&chksm=bd497b4c8a3ef25a1e3abdbf21eca55a6fad98c2e998dc6c13ed1c0bdc2888936ed27a73aa1b&scene=21#wechat_redirect)

* CommnJS标准囊括了 js需要在服务端运行所必备的基础能力。
* 模块化 IO操作 二进制字符串  进程管理  Web网关接口。

# AMD规范:RequireJS

* AMD规范定义了一个 define全局方法用来定义和加载模块。
* RequireJS后期扩展了 require全局方法用来加载模块
* 通过匿名函数来封装模块,并通过函数返回值来定义模块


* getModule 方法对 Module 进行了实例化的模块进行缓存。
* 
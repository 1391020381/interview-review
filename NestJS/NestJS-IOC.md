* 在 express 等后端系统中,会有很多对象 Controller Service Repository Config等。它们之间有依赖关系,创建起来就比较麻烦。

```
const config = new Config({ username: 'xxx', password: 'xxx'});

const dataSource = new DataSource(config);

const repository = new Repository(dataSource);

const service = new Service(repository);

const controller = new Controller(service);


```
* 之前我们手动创建和组装对象不是很麻烦,在 class上声明依赖,然后让工具去分析我们声明的依赖关系,根据先后顺序自动把对象创建好了并组装起来。

* Ioc 
* 它有一个放对象的容器，程序初始化的时候会扫描class上声明的依赖关系,然后把这些class都给 new一个实例放到容器里。
* 创建对象的时候,还会把它们依赖的对象注入进去。
* 这种依赖注入的方式叫做 Dependency Injection,简称 DI。
* 从主动创建依赖到被动等待依赖注入,就是 Inverse of Control,反转控制。


* 总结
    - 后端系统有很多的对象,这些对象之间的关系错综复杂,如果手动创建并组装对象比较麻烦,所以后端框架一般都提供了Ioc机制。
    - Ioc机制是在class上标识哪些是可以被注入的,它的依赖是什么,然后从入口开始扫描这些对象和依赖,自动创建和组装对象。
    - Nest里通过 @Controller声明可以被注入的controller
    - 通过@Injectable声明可以被注入也可以注入别的对象的provider,然后在@Module声明的模块里引入。
    - 并且 Nest还提供了 Module和 Module之间的import,可以引入别的模块的 provider来注入。
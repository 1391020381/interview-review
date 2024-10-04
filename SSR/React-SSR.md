* [React SSR 服务端渲染原理解析与同构实践](https://juejin.cn/book/6844733810941100045)

* [SSR 服务稳定性优化：通用降级方案](https://juejin.cn/post/7021362370739961887)



* SSR CSR  React SSR (首页服务端渲染,客户端再跳转页面,即客户端渲染)

* CSR 最低成本改造为 SSR

# React SSR 根本原理
    - 虚拟dom
    - 同构  指前后端公用一套代码,比如我们的组件可以在服务端渲染也可以在客户端渲染,但都是同一个组件。
    - 双端比较机制  hydration  脱水(数据预取)  注水(客户端激活)

* 需要让代码在浏览器也执行一次,组件在浏览器挂载后 react会自动完成事件绑定。
* 浏览器接管页面后,react-dom在渲染组件前会先和页面中节点做对比,只有对比失败的时候才会采用客户端的内容进行渲染,且react会尽量复用已有的节点。
* 基于同构 浏览器和服务端可以运行同一份代码,服务端直出组件后,浏览器接管页面,然后剩下的工作由浏览器来完成。

* 浏览器端代码执行时生成节点结构会和网页内已有的结构进行对比。 如果对比失败,则采用浏览器端的结构。 服务端内容会有一闪而过。

* 在React的最新版本中（截至知识截止日期为React 18），确实存在关于“hydrate”的弃用警告。这个变化主要是因为React引入了新的并发模式（Concurrent Mode），并且对服务端渲染（SSR）和客户端激活（hydration）的流程进行了重新设计。
* React 18中推荐使用 ReactDOM.createRoot 来创建应用的根节点，并通过调用其上的 .render() 方法来进行渲染或激活。



* 通过一个命令来启动前端代码编译和监听、后端代码编译和监听、同时启动 node 服务并且能够自动重启。
* 通过 child_process 来实现以上目的
* npm-run-all --parallel fe:watch svr:watch node:server

```
//客户端
<BrowserRouter>
      <App/>
</BrowserRouter>
     
// 服务端
<StaticRouter location={req.url} context={context}>   
        <App/>
</StaticRouter>


//根据请求 path 匹配路由，结果返回该路由
const matchRoute=(opt)=>{
    let {path} = opt;
    let route;
    for(var item of routeList){
       if(matchPath(path,item)){
        route = item;
        break;
       }
    }
    return route;
}

export default  async (ctx,next)=>{

    const path = ctx.request.path;

    //查找到的目标路由对象
    let targetRoute = matchRoute(path,routeList);

    //数据预取 -> fetchResult
    let fetchDataFn = targetRoute.component.getInitialProps;
    let fetchResult = {};
    if(fetchDataFn){
        fetchResult = await fetchDataFn();
    }

     //将预取数据在这里传递过去 组内通过props.staticContext获取
    const context = {
        initialData: fetchResult
    };

    html = renderToString(<StaticRouter location={path} context={context}>
        <App routeList={routeList}></App>
    </StaticRouter>);
    //....

    await next();
}

//list 页面 组件
export default class Index extends React.Component {
    constructor(props) {
        super(props);   
        //得到初始化数据
        + initialData = props.staticContext.initialData||{};
        
        + this.state=initialData;
    }

    static async  getInitialProps() {
        //...
    }

    render() {
        //渲染逻辑
        + const {code,data}=this.state;
        
        return <div>
        + {data && data.map((item,index)=>{
            return <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
            </div>
        })}
        {!data&&<div>暂无数据</div>}
        </div>
    }
}

// spa 切换数据获取

  componentDidMount(){
        if(!this.state.data){//判断是否有初始化数据
            //进行数据请求
            Index.getInitialProps().then(res=>{
                this.setState({
                    data:res.data||[]
                })
            })
        }
    }

// react-helmet
// 客户端组件

import { Helmet } from 'react-helmet';

 render() {
        const {tdk={}} = this.state.page || {};
        return <div>
        <Helmet>
                <title>{tdk.title}</title>
                <meta name="description" content={tdk.description}/>
                <meta name="keywords" content={tdk.keywords}/>
        </Helmet>
        首页</div>
    }
 // server
  import { Helmet } from 'react-helmet';
  const helmet = Helmet.renderStatic(); 得到组件的序列化数据
  helmet.title.toString() //直出到客户端
```

* 同构路由
    - 当请求页面的时候,服务端接受请求，根据当前的path来查找具体的路由,然后根据路由得到具体的组件,然后将组件直出。
    - StaticRouter 将服务器上接受到的path传递给此组件用来匹配,同时支持传入context特性，此组件会自动匹配到目标组件进行渲染。
    - import { matchPath } from "react-router";
    - matchPath 用于匹配路由
* 数据同构
    - 组件的一些数据需要从接口异步获取后进行渲染, 数据同构就是服务端和客户端能够使用同一个数据请求处理方法(一套代码),同一份数据进行组件的渲染
    - 浏览器端组件渲染前如何才能得到服务端的数据？
    - 在直出组件的时候同时将数据源也输出给浏览器,而这个过程就叫做 `数据脱水`   
    - 浏览器端在组件渲染前，得到初始化数据，将数据作为属性传递给组件,恢复应用的完整交互性。
    - spa 切换 数据的获取
* SEO TDK
    - TDK
    - title 当前页面的标题 description 当前页面的描述 keywords 当前页面的关键词
    - react-helmet
* CSS资源处理
    - CSS模块无法在服务端解析，通用的CSS资源处理方式
    - 构建工具在编译处理css时,通常会模拟浏览器环境,这是因为css样式最终是要应用在浏览器中的,而浏览器环境对预样式的解析和应用有一套自己的特定规则和机制
    - 兼容性  
    - 性能优化 分割懒加载 treeshaking
    - reactssr vuessr  无浏览器DOM环境 样式注入方式

    - 因为第一次进入是服务端直出的 html 结构，没有 css 。
    - css 是在客户端js 代码执行后动态插入到 head 内的，所以会出现抖动。
    - 我们可以采用传统的方式来解决，将所有的css模块 打包成一个文件，然后在服务端直出的时候带上它，作为资源文件加载。link
    - mini-css-extract-plugin
    - renderToString  通过link再添加

* 构建生产环境
    - 构建工具优化  区分环境  压缩  js分包

```
//生产环境 从 asset-manifest.json 读取资源
        const map = require('@dist/server/asset-manifest.json');
        jsFiles.forEach(item => {
            if(map[item])
                assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
        });
        cssFiles.forEach(item => {
            if(map[item])
                assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
        });

```

* 双服务模式热更新
* 路由按需加载  react-loadable 
    - 要知道在服务端不需要动态导入，服务端只需要处理静态路由即可，所以我们在使用前将动态路由转换为了静态路由。
    - 另外客户端渲染也需要注意，需使用预加载，等异步组件加载完成再进行DOM的挂载，否则会出现客户端覆盖服务端渲染的问题。
* [一文带你梳理React面试题（2023年版本）](https://juejin.cn/post/7182382408807743548?searchId=202409191830177B5320CE7EC46F2D3A47#heading-4)



# [介绍一下 HOC](https://github.com/pro-collection/interview-question/issues/726)

* React中的HOC(高阶组件)是一种基于React的组合特性而形成的设计模式,用于重用组件逻辑。
* 一个高阶组件是一个函数,它接受一个组件并返回一个新组件。

* HOC允许你为组件添加额外的功能而无需更改组件自身的实现。
* 这种模式可以帮助你在React应用程序中保持DRY(不重复你自己),并且可以提升组件的可测性和可维护性。

# HOC的使用场景包括
1. 代码复用 逻辑和引导抽象  可以将共享逻辑抽取到HOC中,让不同的组件能够重用这段逻辑。
2. 渲染劫持  在HOC中可以修改传入组件的JSX结构。
3. 状态抽象和操作  可以将内部状态和相关方法从组件中抽离处理。
4. Props 代理  通过 HOC可以添加 编辑 或 删除传入组件的props。

# [React scheduler调度](https://juejin.cn/post/7331135154209308687)
1. 异步调度原理？
2. React 为什么不用 settimeout?
3. 说一说React 的时间分片？
4. React 如何模拟 requestIdleCallback？
5. 简述一下调度流程？

* 基于任务优先级和时间片的概念,Scheduler围绕着它的核心目标-任务调度,衍生出了两大核心功能:
    - 任务队列管理
    - 时间片下任务的中断和恢复

* scheduler​管理taskQueue​和timerQueue​两个队列，定期将timerQueue​中的到达开始时间的任务放到taskQueue​中，然后让调度者通知执行者循环taskQueue​执行每一个任务。


* [[React] 为何要自己实现调度器， 而不是直接使用 requestIdleCallback ？](https://github.com/pro-collection/interview-question/issues/717)
    - 跨浏览器兼容性
    - 任务队列 和时间切片 通过 实现 任务队列和时间切片 可以不用依赖浏览器 实现对 组件渲染的控制。
    - 不依赖平台   方便 react-native 实现自己的逻辑
    - 未来的兼容性   不受浏览器API变更的影响 

# [[React] Class Components 和 Function Components 有区别](https://github.com/pro-collection/interview-question/issues/582)

* 方面	Class组件	函数组件
* 语法	使用ES6类语法定义组件	使用函数语法定义组件
* 继承	继承自React.Component类	无需继承任何类
* 状态管理	可通过this.state和this.setState来管理状态	可使用useState Hook来管理状态
* 生命周期方法	可使用生命周期方法，如componentDidMount、componentDidUpdate等	可使用Effect Hook来处理副作用
* Props	可通过this.props来访问父组件传递的props	可通过函数参数来访问父组件传递的props
* 状态更新	使用this.setState来更新状态	使用对应的Hook来更新状态
* 内部引用	可以通过Ref引用组件实例或DOM元素	可以使用Ref Hook引用组件实例或DOM元素
* 性能优化	可以使用shouldComponentUpdate来控制组件是否重新渲染	可以使用React.memo或useMemo Hook来控制组件是否重新渲染
* 访问上下文	可以使用this.context来访问上下文	可以使用useContext Hook来访问上下文

# [[React] 构建组件的方式有哪些](https://github.com/pro-collection/interview-question/issues/581)
* class Component
* function component
* hoc
* function as children
* React.cloneElement
* React.createElement


# [[React] 如何实现vue 中 keep-alive 的功能](https://github.com/pro-collection/interview-question/issues/580)

# [[React] 如何给 children 添加额外的属性](https://github.com/pro-collection/interview-question/issues/505)
* 在 React中 可以使用 React.cloneElement() 方法来给children添加额外属性
* React.cloneElement(element,props,...children)
* 其中element是需要克隆的React元素,props是要添加的属性,childrent是要传递给克隆元素的子元素。

```
import React from "react";

function ParentComponent() {
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { additionalProp: "value" })
      )}
    </div>
  );
}

function ChildComponent(props) {
  return <div>{props.additionalProp}</div>;
}

function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}

export default App;

```

# [[React] hooks 和 memorizedState 是什么关系?](https://github.com/pro-collection/interview-question/issues/504)

# [[React] 如何进行路由变化监听](https://github.com/pro-collection/interview-question/issues/496)

* 在React中，props.history.listen 是一个用于监听浏览器历史记录变化的回调函数。这个函数来自于 react-router-dom 库，它是React Router的一个核心组件，用于处理应用程序的路由功能。

```

import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function MyComponent(props) {
  useEffect(() => {
    const handleRouteChange = (location, action) => {
      // 路由发生变化时执行的处理逻辑
      console.log('路由发生了变化', location, action);
    };

    // 在组件挂载后，添加路由变化的监听器
    const unlisten = props.history.listen(handleRouteChange);

    // 在组件卸载前，移除监听器
    return () => {
      unlisten();
    };
  }, [props.history]);

  return (
    <div>
      {/* 在这里编写组件的内容 */}
    </div>
  );
}

// 使用 withRouter 高阶组件将路由信息传递给组件
export default withRouter(MyComponent);

```
* 使用 withRouter 高阶组件（HOC）可以将 history 对象注入到组件的 props 中。
* 如果你使用的是React Router v6，那么应该使用 useNavigate 和 useLocation 等新的Hooks来替代 withRouter。

# [[React] ref 有哪些使用场景，请举](https://github.com/pro-collection/interview-question/issues/477)

# [[React] 合成事件和原生事件触发的先后顺序如何](https://github.com/pro-collection/interview-question/issues/475)

# [[react] constructor 和 getInitialState 的区别?](https://github.com/pro-collection/interview-question/issues/466)

# [[react] 如何合理使用 useContext](https://github.com/pro-collection/interview-question/issues/465)


# [[react] 数组用useState做状态管理的时候，使用push，pop，splice等直接更改数组对象，会引起页面渲染吗](https://github.com/pro-collection/interview-question/issues/464)

* 在React中,使用useState时使用 push pop splice等直接更改数组对象时不推荐的做法,因为这种直接更改数组的方式会改变原始值,React不会监测到这种状态改变，从而无法正确渲染页面。
* 因为 在React中更新数组状态的正确方式是创建一个新的数组对象,然后使用set 函数来更新状态,这样React就能够正确地监测到状态变化,并重新渲染。

# [[React] react-router 页面跳转时，是如何传递下一个页面参数的](https://github.com/pro-collection/interview-question/issues/392)

```
// v6
import { useSearchParams,useParams } from 'react-router-dom';

function MyComponent() {
  const [searchParams] = useSearchParams();

  // 获取特定查询参数
  const myParam = searchParams.get('myParam');
  
   const params = useParams();

  // 获取特定路径参数
  const myParam = params.myParam;

  return (
    <div>
      Query Parameter 'myParam': {myParam}
    </div>
  );
}


// v5



import React from 'react';
import { withRouter } from 'react-router-dom';

class MyComponent extends React.Component {
  render() {
     const myParam = this.props.match.params.myParam;

    const searchParams = new URLSearchParams(this.props.location.search);

    // 获取特定查询参数
    const myParam = searchParams.get('myParam');

    return (
      <div>
        Query Parameter 'myParam': {myParam}
      </div>
    );
  }
}

export default withRouter(MyComponent);




// link  navlink
// const navigate = useNavigate();


// v5

import React from 'react';
import { withRouter } from 'react-router-dom';

class HomeButton extends React.Component {
  handleClick = () => {
    this.props.history.push('/about');
  };

  render() {
    return (
      <button onClick={this.handleClick}>Go to About</button>
    );
  }
}

export default withRouter(HomeButton);


```

# [[React] createContext 和 useContext 有什么区别， 是做什么用的](https://github.com/pro-collection/interview-question/issues/370)

* createContext和useContext是React中用于处理上下文（Context）的两个钩子函数，它们用于在组件之间共享数据。
* createContext用于创建一个上下文对象，该对象包含Provider和Consumer两个组件。createContext接受一个初始值作为参数，该初始值将在没有匹配的Provider时被使用。
* useContext用于在函数组件中访问上下文的值。它接受一个上下文对象作为参数，并返回当前上下文的值。

# [[React] memo 和 useMemo 有和区别？](https://github.com/pro-collection/interview-question/issues/349)

* memo 是防止 props 没变时的重新渲染，useMemo 和 useCallback 是防止 props 的不必要变化。


* React.memo 和 useMemo 是在 React中处理性能优化的两个工具。
* React.memo 是高阶组件 它可以用来优化函数组件的渲染性能。 它会比较当前组件的 props state是否发生变化了,如果都没有变化,就不会重新渲染该组件,而是直接使用之前的结果。


# [[React] 事件绑定原理](https://github.com/pro-collection/interview-question/issues/336)

* [React 事件原理概述](https://juejin.cn/post/7216338005888352293#heading-14)
* React 代码执行时，顶层会自动执行事件的注册，初始化事件插件。
* React 首次渲染时，会在根节点上绑定所有原生事件。支持冒泡的事件，React 会同时绑定捕获阶段和冒泡阶段的事件；不支持冒泡的事件，会将事件绑定在具体 DOM 元素上。
* 事件触发前会从目标元素的 Fiber 节点向上收集同类型事件队列，构造合成对象，同类型的事件会复用同一个合成事件实例对象。
* 根据监听的事件阶段，决定顺序还是倒序遍历执行事件处理函数（模拟事件的冒泡捕获机制）。


# [[React] ref 是如何拿到函数组件的实例](https://github.com/pro-collection/interview-question/issues/304)


* 作为组件渲染  vs 做为 props.children渲染
  - props.children 避免渲染 父组件变化 而重新渲染
  
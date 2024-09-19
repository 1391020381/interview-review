* 对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。
* 但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。
* 为了能让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生，它可以帮助记录 React 中组件的状态，处理一些额外的副作用。

* 组件通信方式
* React 一共有 5 种主流的通信方式：
    - props 和 callback 方式
    - ref 方式。
    - React-redux 或 React-mobx 状态管理方式。
    - context 上下文方式。
    - event bus 事件总线。
* 组件强化的方式
    - 类组件继承
    - 函数组件自定义 Hooks
    - HOC高阶组件
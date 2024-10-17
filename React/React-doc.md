* [React](https://zh-hans.react.dev/learn/state-as-a-snapshot)


```
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )

```

* 一个 state变量的值永远不会再一次渲染的内部发生变化。
* 即使其事件处理函数的代码是异步的。 在  那次渲染的 onClick 内部 number的值即使在调用 setNumber(number+5) 之后也还是0。 它的值在React通过调用你的组件 获取UI的快照 时就被 固定 了。  词法作用域？

* `React会使 state的值始终 固定  在一次渲染的各个事件处理函数内部`
* 状态更新函数

* 设置 state请求一次新的渲染
* React将 state存储在组件之外,就像在架子上一样
* 当你调用 useState时  React会为你提供 该次渲染 的一张 state 快照
* 变量和事件处理函数不会在 重渲染中 存活  每个渲染都有自己的事件处理函数
* 每个渲染(以及其中的函数) 始终看到的是 React提供给 这个 渲染的 state快照

* 如果你想在下次渲染之前多次更新同一个 state, 你可以像 setNumber(n=>n+1) 这样传入一个根据队列中的前一个state计算下一个state的函数
* 而不是像 setNumber(number+1) 这样传入下一个 state值。  这是告诉React 用 state值做某事 而不是仅仅替换它的方法。

* 事件处理函数执行完成后,React将触发重新渲染 在重新渲染期间 React将处理队列。 更新函数会在渲染期间执行,  因此 更新函数必须是 纯函数 并且只返回结果。  ()=> 5  (n)=>n+1


* 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
* React会在事件处理函数执行完成之后处理 state更新。 这被称为批处理。
* 要在一个事件中多次更新某些 state  你可以使用 setNumber(n=>n+1) 更新函数。



* 将react中所有的state都视为不可直接修改的。
* 当你在state中存放对象时,直接修改对象并不会触发重新渲染，并会改变前一次渲染 快照 中  state的值
* 不要直接修改一个对象，而要为它创建一个新 版本 并通过把 state设置成这个新版本来触发重新渲染         {...obj,something:'newValue'}     嵌套  Immer

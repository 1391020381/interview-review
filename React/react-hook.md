# useRef
* 保存dom引用
* const inputRef = useRef<HTMLInputElement>(null)
* inputRef.current?.focus()
* useRef的类型参数是保存的内容的类型
* 通过 ref保存 input元素的引用，然后在useEffect里调用它的focus方法。
* ref的内容是保存在 current属性上。

* ref其实就是一个有current属性的对象，除了可以保存dom引用,也可以放别的内容。 
* 但它不会触发重新渲染。 想触发渲染，还是得配合 state。
* const [,forceRender] = useState(0)
* 不过一般部这么用,如果想改变内容会触发重新渲染，直接用 useState useReducer


```
import { useRef,useState } from 'react';

function App(){
    const numRef = useRef<number>(0);
    const [,forceRender] = useState(0);
    return (
        <div>
                <div onClick={()=>{
                    numRef.current +=1
                    forceRender(Match.random())
                }}>{numRef.current}</div>
        </div>
    )
}

```

# forwardRef + useImperativeHandle
* 把ref从子组件传递到父组件

```

import { useRef,useEffect } from 'react';
import React from 'react';
const Guang:React.ForwardRefRenderFunction<HTMLInputElement> = (props,ref) =>{
    return <div> 
        <input ref={ref}/>
    </div>
}

const WrapedGuang = React.forwardRef(Guang);

function App () {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        console.log('ref',ref.current)
        ref.current?.focus()
    },[])
    return (
        <div className="App">
            <WrapedGuang ref={ref}/>
        </div>
    )
}

```
* useImperativeHandle  暴露自定义内容


```

import { useRef } from 'react';
import { useEffect } from 'react';
import React from 'react';
import { useImperativeHandle } from 'react';

interface RefProps {
  aaa: () => void;
}

const Guang: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return {
      aaa() {
        inputRef.current?.focus();
      }
    }
  }, [inputRef]);

  return <div>
    <input ref={inputRef}></input>
  </div>
}

const WrapedGuang = React.forwardRef(Guang);

function App() {
  const ref = useRef<RefProps>(null);
 
  useEffect(()=> {
    console.log('ref', ref.current)
    ref.current?.aaa();
  }, []);

  return (
    <div className="App">
      <WrapedGuang ref={ref}/>
    </div>
  );
}

export default App;



```
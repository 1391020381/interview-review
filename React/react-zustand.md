
* 用 create函数创建一个 store,定义 state和修改state的方法。
* useXxxStore((state)=>state.aaa state.action)

```

import { create } from 'zustand'

const useXxxStore = create((set) => ({
  aaa: '',
  bbb: '',
  updateAaa: (value) => set(() => ({ aaa: value })),
  updateBbb: (value) => set(() => ({ bbb: value })),
}))

export default function App() {
  const updateAaa = useXxxStore((state) => state.updateAaa)
  const aaa = useXxxStore((state) => state.aaa)

  return (
    <div>
        <input
          onChange={(e) => updateAaa(e.currentTarget.value)}
          value={aaa}
        />
        <Bbb></Bbb>
    </div>
  )
}

function Bbb() {
  return <div>
    <Ccc></Ccc>
  </div>
}

function Ccc() {
  const aaa = useXxxStore((state) => state.aaa)
  return <p>hello, {aaa}</p>
}



```
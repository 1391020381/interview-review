
import { useEffect, useState} from 'react';
import './App.css'
// import { Watermark } from '../../guang-components/dist/esm-0.01';

function A({ children }) {
  console.log('A')
  const [state, setState] = useState(0)
  useEffect(() => {
    setState(state => state + 1)
  }, [])
  return children
}

function B() {
  console.log('B')
  return <C/>
}

function C() {
  console.log('C')
  return null
}

function D() {
  console.log('D')
  return null
}

function App() {
  console.log('App')
  return (
    <div>
      <A><B/></A>
      <D/>
    </div>
  )
}

// function App() {
//   return (
//     <Watermark
//     content={['测试水印', '神说要有光']}
//   >
//    <div style={{height: 800}}>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id provident!</p>
//    </div>
//   </Watermark>
//   )
// }

export default App

import { useState,useEffect} from 'react'
import { flushSync } from 'react-dom';
import './App.css'



function App() {
  const [ number , setNumbsr ] = useState(0)
  useEffect(()=>{
      console.log('监听number变化，此时的number是:  ' + number )
  },[ number ])
  const handerClick = ()=>{
      flushSync(()=>{
          setNumbsr(2)
          console.log(number)
      })
      setNumbsr(1)
      console.log(number)
      setTimeout(()=>{
          setNumbsr(3)
          console.log(number)
      })

  }
  console.log(number,'number')
  return (
   
    <div>
       <button onClick={handerClick}>{number}</button>
    </div>
  )
}

export default App

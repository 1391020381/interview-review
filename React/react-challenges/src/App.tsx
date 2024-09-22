import { useState } from 'react'
import './App.css'



function App() {
  const [state,setState] = useState(0)
  return (
   
    <div>
       <button onClick={()=>{
         setState(()=>state+1)
       }}>{state}</button>
    </div>
  )
}

export default App

import { useEffect, useState } from "react"

function useEffectFn(){
    const [state,setState] = useState(1)
    useEffect(()=>{
        console.log(1)
    },[])
    useEffect(()=>{
        console.log(2)
    },[1,state])
    return (
        <div>
           <button onClick={()=>{
             setState(()=>{
                return state + 1
             })
           }}>{state}</button>
        </div>
    )
}
export default  useEffectFn
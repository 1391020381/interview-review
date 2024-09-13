
```
const ThemeContext = React.createContext(null)
// 函数组件 - useContext方式
function ConsumerDemo(){
    const  contextValue = React.useContext(ThemeContext) /*  */
    const { color,background } = contextValue
    return <div style={{ color,background } } >消费者</div> 
}
const Son = ()=> <ConsumerDemo />




// 逐层传递Provder
const ThemeContext = React.createContext(null)
function Son2(){
    return <ThemeContext.Consumer>
        { (themeContextValue2)=>{
            const { color , background } = themeContextValue2
            return  <div  className="sonbox"  style={{ color,background } } >  第二层Provder </div>
        }  }
    </ThemeContext.Consumer>
}
function Son(){
    const { color, background } = React.useContext(ThemeContext)
    const [ themeContextValue2 ] = React.useState({  color:'#fff', background:'blue' }) 
    /* 第二层 Provder 传递内容 */
    return <div className='box' style={{ color,background } } >
        第一层Provder
        <ThemeContext.Provider value={ themeContextValue2 } >
            <Son2  />
        </ThemeContext.Provider>
    </div>

}

export default function Provider1Demo(){
    const [ themeContextValue ] = React.useState({  color:'orange', background:'pink' })
     /* 第一层  Provider 传递内容  */
    return <ThemeContext.Provider value={ themeContextValue } >
        <Son/>
    </ThemeContext.Provider> 
}



```
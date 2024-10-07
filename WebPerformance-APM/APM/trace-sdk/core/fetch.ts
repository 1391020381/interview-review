// 1. 获取原有的 fetch  const { fetch:originFetch} = window
// 重新定义 interceptFetch({pathPath,onError,onBefore,onAfter })

import { getTimestamp } from "./utils"
const { fetch: originFetch } = window;

const interceptFetch = ({
    pagePath,
    onError,
    onBefore,
    onAfter
}) =>{
    return async (...args:any)=>{
        let { url,options} = args
        const startTime = getTimestamp()
        let res;
        try{
          onBefore&&onBefore({
            url,
            method:options.method,
            options
          }) 
          res = await originFetch(url,options)
          onAfter && onAfter(res)  
        }catch(err){
            onError({
                url,
                status:res.status,
                statusText:res.statusText,
                method:options.method,
                body:options.body,
                elapsedTime: getTimestamp() - startTime,
            })
        }
        return res
    }
}
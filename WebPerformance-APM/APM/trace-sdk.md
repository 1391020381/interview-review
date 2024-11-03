# core
- fetch     XMLHttpRequest
    - 重写fetch try { onBefore originFetch onAfter  } catch(err){onError}
    - pagePath
    - onError   traceSdk.onFetchError(error)
    - onBefore  traceSdk.saveBreadcrumb()
    - onAfter   traceSdk.saveBreadcrumb()  
- fingerprint  canvas
- request.ts
    - navigator.sendBeacon(dsn,body)
    - fetch(dsn,{body,method:"POST",keepalive:true})
    - XMLHttpRequest

```
const client = new XMLHttpRequest()

client.open('POST',dsn,false)
client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8')
client.send(body)

```

- send.ts
    - sendBeacon  navigator.sendBeacon(url,JSON.stringify(data))
    - sendByImg

```
function safeStringify(obj: object): string {
  const set = new Set()
  const str = JSON.stringify(obj, function (_key, value) {
    if (set.has(value)) {
      return ''
    }
    typeof value === 'object' && set.add(value)
    return value
  })
  set.clear()
  return str
}

function sendByImg(url: string, data: TraceData) {

  const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
  const imageUrl = `${url}${spliceStr}data=${encodeURIComponent(safeStringify(data))}`;
  let img = new Image()
  img.src = imageUrl
  img.onload = function() {
    console.log("Tracking data sent successfully!");
    img = null
  };
  img.onerror = function(err) {
    console.error("Failed to send tracking data.", err);
    img = null
  };
}

```
- util.ts
    - 

- webvitals.ts
    - onVitals  TTFB FCP LCP FID INP CLS
    - mapMetric  组装数据
    - generateUniqueId

* baseTrace.ts
- constructor
- pageId =  uuid()
- fpId  =   getFingerprintId('TraceCourse')
- perfData = {}
- resources = []
- breadcrumb
- queue 存储链路日志数据
- this.observer = new PerformanceObserver((list,observer)=>{})
  - list   entry.entryType === 'resource' 
  - entry.duration > 1000 
  - this.resource.push({
        url: entry.name,
        name: `${entry.entryType}-duration-${entry.initiatorType}`,
        type: TraceDataTypes.PERF,
        level,
        message: `duration:${Math.round(entry.duration)}`,
        time: getTimestamp(),
        dataId: hashCode(`${entry.entryType}-${entry.name}`),
      })
 - log
  - log:TraceDataLog
  - this.saveBreadcrumb({})  ->  this.breadcrumb.push()
  - this.send(log)
    - this.setTraceData(data) ->  data perf 数据进行整合
    - sendByImg(this.dsn,tranceData)
- info
  - this.log
- warn
  - this.log
- error
  - this.log
- setTraceData 
  - data perf 数据进行整合
- send  sendByImg()

- createPerfReport
  - webvital   perfData 数据整合   pagehide 时上报
- saveError
  - script-error
  - resource-load-error
  - this.resources.push()
  - this.breadcrumb.push()
  - this.queue.push()  空闲时触发上报
- onFetchError
- onGlobalError
  - window.addEventListener('error',(event)=>{})
  - window.addEventListener('unhandledrejection', (event: any) => {})
- onGlobalClick
  - window.addEventListener('click', (event) => {})
  - this.saveBreadcrumb()


- init(options)
  - new BaseTrace(options)
  -  traceSdk.onGlobalError()
  - traceSdk.observer.observe({
      entryTypes: ["resource"],
    });
  - window.fetch
  - onVitals
  - setInterval   sendByImg queue
  - return tranceSdk 
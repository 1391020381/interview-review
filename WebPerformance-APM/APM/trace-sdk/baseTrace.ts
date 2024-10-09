
// 初始化 const traceSdk = new BaseTrace()
// traceSdk.onGlobalError()
// traceSdk.observer.observe({entryTypes:['resource]})
// windo.fetch  = interceptFetch({})
// onVitals(traceSdk.createPerfRepoet())
// setInterval(()=>{},)


// this.perfData = {}
// this.observer = new PerformanceObserver()
// log  saveBreadcremb()
// saveBreadcremb  this.breadcrumb.push()
// info
// warn
// error
// setTraceData   {type,level,createdAt,updatedAt,data:_data,perf,breadcrumbs}
// send -> sendByImg
// createPerfReport   
// saveError  
// onGlobalClick()
export class BaseTrace {
    public dsn:string = ''
    public pageId:string = ''
    public userAgent = navigator.userAgent;
    public browserType = 'BrowserType.MOBILE'

    public fpId = ''
    public uid = ''
    public appId = ''
    public debug = true

    public perfData = {

    }
    public resource = []
    public result = []

    public breadcrumb = []
    
    public maxBreadcrumb = 10

     // 存储链路日志数据
  public queue  = []

  // 发送请求时间间隔
  public sendTimer = 1000
}
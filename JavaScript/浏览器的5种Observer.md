1. MutationObserver
    - MutationObserver 可以监听对元素的属性的修改、对它的子节点的增删改。

```

const config = {
  childList: true, // 观察子节点变化
  attributes: true, // 观察属性变化
  attributeOldValue: true, // 记录属性变化前的旧值
  characterData: true, // 观察文本内容变化
  characterDataOldValue: true, // 记录文本内容变化前的旧值
  subtree: true // 观察整个子树的变化
};

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    console.log(mutation.type); // 输出变化的类型
  }
});

const targetNode = document.querySelector('#my-element');
observer.observe(targetNode, config); // 开始观察目标节点

```    
2. IntersectionObserver
    * IntersectionObserver 可以监听一个元素和可视区域相交部分比例,然后在可视比例达到某个阈值的时候触发回调。

```

const options = {
  root: null, // 使用默认的顶级文档视窗
  rootMargin: '0px',
  threshold: 0.5 // 当目标元素至少有50%进入视口时触发回调
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible!');
    } else {
      console.log('Element is not visible.');
    }
  });
}, options);

const targetElement = document.querySelector('#my-element');
observer.observe(targetElement); // 开始观察目标元素


```

3. PerformanceObserver
    - PerformanceObserver 用于监听记录 performance 数据的行为，一旦记录了就会触发回调，这样我们就可以在回调里把这些数据上报。

 ```

// 创建 PerformanceObserver 实例
const observer = new PerformanceObserver((list, observer) => {
  list.getEntries().forEach(entry => {
    handlePerformanceEntry(entry);
  });
}, { entryTypes: ['mark', 'measure', 'gc', 'function', 'longtask', 'paint', 'resource', 'navigation', 'frame'] });

observer.observe();

// 处理不同类型条目的函数
function handlePerformanceEntry(entry) {
  console.log(`Name: ${entry.name}`);
  console.log(`Type: ${entry.entryType}`);
  console.log(`Start Time: ${entry.startTime}`);
  console.log(`Duration: ${entry.duration}`);

  switch (entry.entryType) {
    case 'gc':
      console.log('Garbage Collection Details:', entry.garbageCollectionDetails);
      break;
    case 'function':
      console.log('Function Call Details:', entry.functionCallDetails);
      break;
    case 'longtask':
      console.log('Long Task Details:', entry.longTaskDetails);
      break;
    case 'paint':
      console.log('Paint Details:', entry.paintDetails);
      break;
    case 'resource':
      console.log('Resource Loading Details:', entry.resourceLoadingDetails);
      break;
    case 'navigation':
      console.log('Navigation Details:', entry.navigationDetails);
      break;
    case 'frame':
      console.log('Frame Rendering Details:', entry.frameRenderingDetails);
      break;
    default:
      // 处理其他类型的条目
      break;
  }
}

// 自定义任务示例
function customTask() {
  performance.mark('customTaskStart');

  // 模拟一些耗时操作
  setTimeout(() => {
    performance.mark('customTaskEnd');
    performance.measure('customTask', 'customTaskStart', 'customTaskEnd');
    console.log('Custom Task Completed');
  }, 2000);
}

// 调用自定义任务
customTask();

 ```       

4. ResizeObserver
    * 元素可以用 ResizeObserver 监听大小的改变，当 width、height 被修改时会触发回调。

```
const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log('Element:', entry.target);
    console.log('New width:', entry.contentRect.width);
    console.log('New height:', entry.contentRect.height);
  }
});

const targetElement = document.querySelector('#my-element');
observer.observe(targetElement);  // 开始观察目标元素

// 在某些时候停止观察
// observer.unobserve(targetElement);

// 或者完全停止观察并清理资源
// observer.disconnect();

```
5. ReportingObserver。
  - ReportingObserver 可以监听过时的 api、浏览器干预等报告等的打印，在回调里上报，这些是错误监听无法监听到但对了解网页运行情况很有用的数据。

```
const reportingObserver = new ReportingObserver((reports, observer) => {
    for (const report of reports) {
        console.log(report.body);//上报
    }
}, {types: ['intervention', 'deprecation']});

reportingObserver.observe();


```

performance.getEntries()    // PerformanceEntry: []

performance.getEntriesByName("login-started", "mark");     // PerformanceMark: []

performance.getEntriesByType("resource");    // PerformanceResourceTiming: []


// PerformanceResourceTiming
const resourceTimings = window.performance.getEntriesByType('resource');
for (let i = 0; i < resourceTimings.length; i++) {
  console.log(resourceTimings[i]);
}

// PerformanceEventTiming
const eventTimings = window.performance.getEntriesByType('event');
for (let i = 0; i < eventTimings.length; i++) {
  console.log(eventTimings[i]);
}

performance.mark("login-started", {
  detail: { href: location?.href },
});

performance.mark("login-finished", {
  detail: { loginType: 'email' },
});

// measure
performance.measure("login-duration", {
  detail: { userRegion: 'cn' },
  start: 'login-started',
  end: 'login-finished',
});


// 1. 创建一个PerformanceObserver实例
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`资源名称: ${entry.name}`);
    console.log(`资源类型: ${entry.initiatorType}`);
    console.log(`资源加载时间: ${entry.duration}ms`);
  });
});

// 2. 指定要观察的性能条目类型（下文为全部类型）
const entryTypes = [       // 对应上文的性能记录子类：
    "resource",            // PerformanceResourceTiming
    "visibility-state",    // VisibilityStateEntry
    "mark",                // PerformanceMark
    "measure",             // PerformanceMeasure
    "event",
    "element",
    "first-input",
    "largest-contentful-paint",
    "layout-shift",
    "longtask",
    "navigation",
    "paint",
    "taskattribution",
];

// 3. 启动 PerformanceObserver 来观察指定类型的性能条目
observer.observe({ entryTypes });

// 4. 停止观察
observer.disconnect();


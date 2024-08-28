
// webpack  
// require.context
function getComponent() {
    const componentConfig = [];
    const requireConfig = require.context(
      './components',
      // 是否查询其子目录
      true,
      /package.json$/
    );
    requireConfig.keys().forEach(fileName => {
      const config = requireConfig(fileName);
      componentConfig.push(config);
    });
  
    return componentConfig;
  }
  
  // vite 
// import.meta.glob
  async function getComponent() {
    const componentFiles = import.meta.glob('./components/**/package.json')
    const componentConfig = []
  
    for (const path in componentFiles) {
      const config = await componentFiles[path]() // 注意这里需要使用 await 或者 .then 来等待 Promise
      componentConfig.push(config.default)
    }
  
    return componentConfig
  }
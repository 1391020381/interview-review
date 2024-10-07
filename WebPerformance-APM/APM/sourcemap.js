

const sourceMap = require('source-map-js');

// 假设你已经从监控SDK中获得了以下堆栈跟踪信息（编译后的位置）
const stackFrame = "at myFunction (http://example.com/app.js:123:45)";

// 提取关键信息
const [methodName, location] = stackFrame.split(' (');
const [, scriptUrl, compiledPosition] = location.match(/(.+):(\d+):(\d+)\)$/);
const [compiledLine, compiledColumn] = compiledPosition.split(':').map(Number);

// 加载Source Map
sourceMap.SourceMapConsumer.with(
  new sourceMap.SourceMapConsumer({
    // 这里应该是你的Source Map文件的URL或者内容
    url: 'http://example.com/app.js.map',
  }),
  consumer => {
    // 使用Source Map解析原始位置
    consumer.originalPositionFor({
      line: compiledLine,
      column: compiledColumn,
    }, (err, originalPosition) => {
      if (err) {
        console.error('Source Map解析失败:', err);
        return;
      }
      
      // 输出具体的报错信息
      console.log(`错误发生在: ${originalPosition.source}:${originalPosition.line}:${originalPosition.column}`);
      console.log(`原始函数名: ${originalPosition.name || methodName}`);
      // 可以继续处理其他上下文信息...
    });
  }
);



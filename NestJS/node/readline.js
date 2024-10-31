// readline 
// readline 允许可读流以逐行的方式读取数据  比如 process.stdin 等 


const fs = require('fs');
const readline = require('readline');

// 创建一个可读流来读取大型 JSON 文件
const readStream = fs.createReadStream('large-file.json', { encoding: 'utf8' });

// 使用 readline 接口逐行读取文件
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity // 识别所有 CR LF ('\r\n') 为单个换行符
});

// 处理每一行数据
rl.on('line', (line) => {
  try {
    // 解析每一行的 JSON 数据
    console.log('line:',line)
   // const data = JSON.parse(line);
    // 在这里处理每个 JSON 对象
    // console.log(data);
  } catch (err) {
    console.error('解析 JSON 时发生错误:', err);
  }
});

// 处理流结束
rl.on('close', () => {
  console.log('JSON 文件处理完成');
});

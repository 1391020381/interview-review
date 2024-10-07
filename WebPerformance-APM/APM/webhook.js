

// webhook.js
const BASE_URL = 'https://oapi.dingtalk.com/robot/send'
function buildWebhook(accessToken) {  return `${BASE_URL}?access_token=${accessToken}`}
const robotConfig = {
    name: '前端全链路监控助手',
    accessToken: '<dingtalk robot access_token>',
    secret: '<dingtalk robot srcret>',
  }
  
  async function send(content) {
    let singStr = '';
    if (robotConfig.secret) {
      const timestamp = Date.now();
      singStr = '&timestamp=' + timestamp + '&sign=' + sign(robotConfig.secret, timestamp + '\n' + robotConfig.secret);
    }
    const webhook = buildWebhook(robotConfig.accessToken) + singStr;
  
    const result = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    });
    console.log('result: ', await result.json())
    return result
  }




  // index.js

const webhook = require('./webhook');

app.get('/track.gif', (req, res) => {
  const data = req.query.data; // 获取URL中的data参数
  // 省略部分逻辑
  webhook.sendText(data);

  // 省略部分逻辑
});
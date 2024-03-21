const VueRenderer = require('vue-server-renderer').createRenderer();
const Vue = require('vue');
const fs = require('fs');
const path = require('path')
 
const app = new Vue({
  // 这里是你的Vue组件
  template: `<div>Hello, world!</div>`
});


VueRenderer.renderToString(app).then(html => {
  fs.writeFileSync('component.html', html);
}).catch(err => {
    console.error(err);
});

const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const html = fs.readFileSync(path.resolve('component.html'), 'utf8'); 
    await page.setContent(html);
    await page.screenshot({path: 'component.png'});
    await browser.close();
  } catch(err) {
    console.error(err);
  }
})();
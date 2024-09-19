```

import { renderToString } from '@vue/server-renderer';
import { createSSRApp } from 'vue';
import { createRouterInstance } from './router';
import App from './App.vue';

export async function render(url) {
const router = createRouterInstance();
router.push(url); // 将URL推送到路由器

try {
await router.isReady(); // 等待路由器准备就绪
} catch (error) {
throw new Error(`Could not navigate to ${url}: ${error.message}`);
}

const app = createSSRApp({
template: `<router-view></router-view>`,
router,
});

const appContent = await renderToString(app);
return { appContent };
}

```
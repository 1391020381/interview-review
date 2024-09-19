* 在React Router中，StaticRouter组件可以配合location属性来实现路由匹配的功能。StaticRouter是一个不依赖于浏览器环境的路由器，它主要用于服务器端渲染（Server-Side Rendering, SSR）。当你需要在服务器上根据请求的URL来渲染React组件时，你会使用StaticRouter


```

import express from 'express';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const app = express();

app.get('*', (req, res) => {
const context = {};
const reactApp = (
<StaticRouter location={req.url} context={context}>
<App />
</StaticRouter>
);

const reactDom = ReactDOMServer.renderToString(reactApp);

res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>React SSR</title>
</head>
<body>
<div id="root">${reactDom}</div>
</body>
</html>
`);
});

app.listen(3000);


```
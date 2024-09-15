# iframe cookie

* 重点讲解 iframe中的 Cookie 数据在跨域和跨站中的表现, 深入了解 微前端中 iframe 中  Cookie的处理。


* 主子应用同域可以通过共享 Cookie 来解决登录态的问题，是非常常用的一种微前端方案。


* [sameSite Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
* [浏览器系列之 Cookie 和 SameSite 属性 #157](https://github.com/mqyqingfeng/Blog/issues/157)


* 采用iframe 进行微前端设计时,Chrome浏览器中主子应用跨站的情况下,默认iframe子应用无法携带Cookie,需要使用HTTPS协议和并设置服务端Cookie 属性 SameSite 和  Secure 才行。
* 跨站的情况下,主子应用无法进行Cookie 共享。


* 主子应用同域：可以携带和共享 Cookie，存在同名属性值被微应用覆盖的风险
* 主子应用跨域同站：默认主子应用无法共享 Cookie，可以通过设置 Domain 使得主子应用进行 Cookie 共享
* 主子应用跨站：子应用默认无法携带 Cookie（防止 CSRF 攻击），需要使用 HTTPS 协议并设置服务端 Cookie 的 SameSite 和 Secure 设置才行，并且子应用无法和主应用形成 Cookie 共享

# 盒子模型

* 一个盒子由四部分组成  content padding border  margin
* 在 CSS中  盒子模型可以分成  W3C标准盒子模型  IE怪异盒子模型  默认情况是 W3C标准盒子模型
* box-sizing: content-box|border-box|inherit:
* content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
* border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
* inherit 指定 box-sizing 属性的值，应该从父元素继承


# flex

* 容器属性
    - 容器就是 设置 display:flex的元素
    - flex-direction:row | row-reverse | column  | column-reverse
    - flex-wrap: norap | wrap |  wrap-reverse 
    - flex-flow:<flex-direction> <flex-wrap>
    - justify-content:flex-start | flex-end | center | space-betweet | space-around
    - align-items: flex-start | flex-end | center | baseline
    - align-content:
* 项目属性
    - order 定义项目的排列顺序。 数值越小 排列越靠前 默认为0
    - flex-grow: 定义成员的放大比例 默认为0， 如果存在剩余空间 也不放大。
    - flex-shrink: 定义项目的缩小比例 默认为 1 即如果空间不足，该项目将缩小。  flex-shrink:1 空间不足等比例缩小。
    - flex-basis:也就是说在成员要平分这个容器剩余空间时，可以通过flex-basis属性先给其中个别成员占一个空间，再去参与平分剩余的空间，平分完之后个别成员再加上前面占的空间才是添加了flex-basis属性的成员最终大小
    - flex 属性是 flex-grow flex-shrink flex-basis的简写, 默认 0 1 auto  后两个属性可选。
    - flex:1 表示所有成员将平分剩余空间。
    -  align-self属性允许单个项目有与其他项目不一样的对齐方式

# rem 移动端适配

```
 <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    function setRootRem() {
            const root = document.documentElement;
            /** 以iPhone6为例：布局视口为375px，我们把它分成10份，则1rem = 37.5px，
             * 这时UI给定一个元素的宽为375px（设备独立像素），
             * 我们只需要将它设置为375 / 37.5 = 10rem。 750/375 * 2
            */
            const scale = root.clientWidth / 10
            root.style.fontSize = scale + 'px'  
        }
        setRootRem()
        window.addEventListener('resize', setRootRem)

```
* vw(viewport width) vh(viewport height) 是基于视图窗口的单位。
* 如果按视觉视口为375px，那么1vw = 3.75px，这时UI给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 3.75 = 20vw。

# 0.5px

```

<div class="border">0.5像素边框</div>
<style>
    .border {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        position: relative;
    }
    .border::after { // 单边
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: red;
        transform: scaleY(0.5);
    }
// 多边
    <div class="border">0.5像素边框~~~~</div>
<style>
    .border {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        position: relative;
    }
    .border::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid red;
        transform-origin: 0 0;
        transform: scale(0.5);
    }
</style>
</style>

```

# css透明度



#  link import
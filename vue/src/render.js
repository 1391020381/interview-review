import { createElement, createTextNode } from "./vdom/index";
import { nextTick } from "./util/next-tick";

export function renderMixin(Vue) {
    // render函数里面有_c _v _s方法需要定义
    Vue.prototype._c = function (...args) {
        // 创建虚拟dom元素
        return createElement(this, ...args);
    };

    Vue.prototype._v = function (text) {
        // 创建虚拟dom文本
        return createTextNode(this, text);
    };
    Vue.prototype._s = function (val) {
        // 如果模板里面的是一个对象  需要JSON.stringify
        return val == null
            ? ""
            : typeof val === "object"
                ? JSON.stringify(val)
                : val;
    };

    Vue.prototype._render = function () {

        const vm = this;
        // 获取模板编译生成的render方法
        const { render } = vm.$options;
        console.log("🚀 ~ file: render.js ~ line 28 ~ renderMixin ~ render", render);
        // 生成vnode--虚拟dom
        const vnode = render.call(vm);
        return vnode;
    };

    // 挂载在原型的nextTick方法 可供用户手动调用
    Vue.prototype.$nextTick = nextTick;
}

export default {
    name: "keep-alive",
    abstract: true, //抽象组件

    props: {
        include: patternTypes, //要缓存的组件
        exclude: patternTypes, //要排除的组件
        max: [String, Number], //最大缓存数
    },

    created() {
        this.cache = Object.create(null); //缓存对象  {a:vNode,b:vNode}
        this.keys = []; //缓存组件的key集合 [a,b]
    },

    destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys);
        }
    },

    mounted() {
        //动态监听include  exclude
        this.$watch("include", (val) => {
            pruneCache(this, (name) => matches(val, name));
        });
        this.$watch("exclude", (val) => {
            pruneCache(this, (name) => !matches(val, name));
        });
    },

    render() {
        const slot = this.$slots.default; //获取包裹的插槽默认值
        const vnode = getFirstComponentChild(slot); //获取第一个子组件
        const componentOptions =
            vnode && vnode.componentOptions;
        if (componentOptions) {
            // check pattern
            const name = getComponentName(componentOptions);
            const { include, exclude } = this;
            // 不走缓存
            if (
                // not included  不包含
                (include && (!name || !matches(include, name))) ||
                // excluded  排除里面
                (exclude && name && matches(exclude, name))
            ) {
                //返回虚拟节点
                return vnode;
            }

            const { cache, keys } = this;
            const key =
                vnode.key == null
                    ? // same constructor may get registered as different local components
                    // so cid alone is not enough (#3269)
                    componentOptions.Ctor.cid +
                    (componentOptions.tag ? `::${componentOptions.tag}` : "")
                    : vnode.key;
            if (cache[key]) {
                //通过key 找到缓存 获取实例
                vnode.componentInstance = cache[key].componentInstance;
                // make current key freshest
                remove(keys, key); //通过LRU算法把数组里面的key删掉
                keys.push(key); //把它放在数组末尾
            } else {
                cache[key] = vnode; //没找到就换存下来
                keys.push(key); //把它放在数组末尾
                // prune oldest entry  //如果超过最大值就把数组第0项删掉
                if (this.max && keys.length > parseInt(this.max)) {
                    pruneCacheEntry(cache, keys[0], keys, this._vnode);
                }
            }

            vnode.data.keepAlive = true; //标记虚拟节点已经被缓存
        }
        // 返回虚拟节点
        return vnode || (slot && slot[0]);
    },
};

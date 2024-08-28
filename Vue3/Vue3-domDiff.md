* [dom-diff](https://juejin.cn/post/7190726242042118200)
# diff算法触发的场景
* diff算法本质是一个对比的方法。其核心就是在 "旧DOM组更新为 新DOM组"时 如何更新才能效率更高。
* 触发diff 一定是一组dom发生变化。
# v-for循环时,key属性的意义
1. vue通过 isSameVNodeType 判断两个 节点 是否相同
2. isSameVNodeType 主要依赖 type keyi 进行判断
3. type 表示 节点类型
4. key 表示节点的唯一标识
5. isSameVNodeType 返回为 true 则不需要更新，返回为false 则需要更新。
# diff算法的5大步
1.  sync from start  自前向后的对比
2.  sync from end    自后向前的对比
3.  common sequence + mount  新节点多于就节点 需要挂载
4.  common sequence + unmount  旧节点多于新节点 需要挂载
5.  unknown sequence  乱序
# 最长递增子序列
# diff算法的第五部详解


* oldChildren : [A,B,C,D,E]
* newChildren : [A,C,D,B,E]

* Sync from start 自前向后的对比
* 我们从头开始比较 A = A 所以我们继续比较下一个

* Sync from end  自后向前的对比
* 我们从尾部开始比较 E = E 所以 我们继续比较 上一个。

* 通过步骤1 步骤2 我们的新节点列表跟旧节点列表的比较情况如下
* oldChildren [,B,C,D,]
* newChildren  [,C,D,B]
* 显然不能 mount  unmount 因为新旧 都有未比较的节点。 需要进入 unknown sequence  乱序





# 快速diff算法 5个步骤
1. 预处理前置节点
2. 预处理后置节点
3. 处理仅有新增节点情况
4. 处理仅有卸载节点情况
5. 处理其他情况 （新增 卸载 移动）

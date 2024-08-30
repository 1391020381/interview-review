* mobx


* makeObservable  
    - constructor(){ makeObservable(this)}
    - 新版本想要让整个模块可影响式，需要在 constructor执行如上方法
* observabel
    - 会给属性值加一个观察者对象，使其能变成可观察的，当属性值改变的时候，观察者会通知每一个依赖项。
    - @observable name = 'React进阶实践指南'
* action
    - 通过 action包裹的函数，可以用来修改mobx中状态
    -   @action setName(newName){this.name = newName}   
* computed
    - 根据现有的状态或其它计算值衍生出的值 
    - @observable price = 666  // 可观察属性——价格
      @observable count = 1    // 可观察属性——数量
      @computed get total() {  
       return this.price * this.count
     }

* mobx-react
    - Provider 用于把 mobx的各个模块，用Context 上下文形式 保存起来 供给组件使用。
    - <Provider Root={Root}>{}</Provider>

    - inject 高阶组件可以把 Provider 中的 mobx 模块，混入到组件的 props 中，所以就可以在组件中消费状态，或者调用改变状态的方法。
    - @inject('Root')
      class Index extends React.Component{}
    
    - 被 observer 高阶组件包装的组件，如果组件内部引入了 mobx 可观察属性值，当值改变的时候，会追溯到当前组件，促使当前组件更新。
    - @observer
      class Index extends  React.Component{}



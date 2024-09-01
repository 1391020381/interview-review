* React-Router基本组成
1. history location match
    - 在路由页面开发中，开发者通过访问 props 发现路由页面中props被加入了这几个对象。
    - history对象 history对象保存改变路由方法 push  replace 和监听路由方法listen等
    - location对象  可以理解为当前路由状态下的路由信息，包括 pathname state等
    - match对象 这个用来证明当前路由的匹配信息的对象。存放当前路由path等信息。
 2. 路由组件
    - Router 是整个应用路由的传递者和派发更新者
    - 开发者一般不会直接使用Router 而是使用react-router-dom中 BrowserRouter或者 HashRouter,两者关系就是Router作为一个传递路由和更新路由的容器。
    - 开发者确保整个系统中有一个根部的BrowserRouter  HashRouter就可以了。
 3. Route
    - Route是整个路由核心部分，它的工作主要就是 匹配路由  路由匹配 渲染组件
    - 整个路由状态是用 context传递  Route 可以通过 RouterContext.Consumer来获取上一级传递来的路由进行路由匹配，如果匹配 渲染子代路由。   
    - component
    - render
    - children
    - renderProps   


```

function Index(){ 
    const mes = { name:'alien',say:'let us learn React!' }
    return <div>      
        <Meuns/>
        <Switch>
            <Route path='/router/component'   component={RouteComponent}   /> { /* Route Component形式 */ }
            <Route path='/router/render'  render={(props)=> <RouterRender { ...props }  /> }  {...mes}  /> { /* Render形式 */ }
            <Route path='/router/children'  > { /* chilren形式 */ }
                <RouterChildren  {...mes} />
            </Route>
            <Route path="/router/renderProps"  >
                { (props)=> <RouterRenderProps {...props} {...mes}  /> }  {/* renderProps形式 */}
            </Route>
        </Switch>
    </div>
}
export default Index


```
3. switch Switch 作用是先通过匹配选出一个正确路由 Route 进行渲染。
4. Redirect 可以在路由不匹配情况下跳转指定某一路由，适合路由不匹配或权限路由的情况。


* 路由状态获取
    - props
    - withRouter
    -  useHistory 和 useLocation
* 路由参数
    - 编程
    - 动态路由
* 嵌套路由
* 路由扩展  - HOC    




# React-Router V6
* [React-Router-V6](https://reactrouter.com/en/main/start/tutorial)

* 子路由的 path 不要 以 /  开头     它会追加父路由path


* 路由匹配 -> 渲染组件  -> useEffect(loadData,[]) const [loading,setLoding] = useState(false)
* 路由匹配 ->loader  ->  const loaderData = useLoaderData()   curd 会把操作提交到action  自动更新页面    期间  loading状态 const navigation = useNavigation();  navigation.state !='idle'


* auth


```
interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

// 包裹需要路由权限的组件
function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

```
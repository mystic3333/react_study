##### react学习网站: https://reacttraining.com

##### 接口地址: iwenwiki.com

### antd按需加载配置

1.npm run eject 拉取react配置文件

    拉取配置文件失败报错: Remove untracked files, stash or commit any changes, and try again.
    问题解释: 因为更改了create-react-app原本的项目结构, 需要重新将代码提交至仓库
    解决方法: 将.git文件删除后, 再执行 npm run eject

2.npm install babel-plugin-import --save-dev

    参考地址: https://github.com/ant-design/babel-plugin-import

3. 配置package.json

     "babel": {
        "presets": [
        "react-app"
        ],
        "plugins": [
            [
                "import", {
                    "libraryName": "antd",
                    "libraryDirectory": "es",   
                    "style": "css" 
                }
            ]
        ]
    }

### 跨域解决方案

参考资料:

    blog地址: http://iwenwiki.com/
    github地址: https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md

1. 开发环境: 

    参考文档的第一种解决方案: https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md

    package.json文件中增加以下配置:

    - "proxy": "http://localhost:3100" 
    - npm start 重启服务

2. http-proxy-middleware

    参考文档的第二种解决方案: https://github.com/facebook/create-react-app/blob/master/docusaurus/docs/proxying-api-requests-in-development.md

    在src下创建setupProxy.js文件
    src/setupProxy.js

``` 
npm install http-proxy-middleware --save

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
};
```

### fetch封装

``` 
const qs = require('querystring')

export function httpGet(url) {
    const result = fetch(url)
    return result
}

export function httpPost(url, params) {
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-encoded',
            'Accept': 'application/json'
        },
        body: qs.stringify(params)
    })
}
```

### 路由

参考资料: https://reacttraining.com/react-router/web/api

1. npm install --save react-router-dom

2. 引入 import {BroswerRouter as Router, Route, Switch, Link} from 'react-router-dom'

``` 
// 定义Route
2-1 通过component的方式引用组件
 <Route strict exact path="/" component={Home}></Route>

2-2 通过render方式引用组件
 <Route path="/demo" render={ (props) => <Demo {...props} title="hello"/> }></Route>
```

3. 路由参数传递

第一种: 通过路径传递参数, 通过 props.match.params.key 获取参数

``` 
 ?代表可选参数的意思, 传不传递都可以
 <Route strict exact path="/mine/:id?" component={Mine}></Route>
```

第二种: 通过 new URLSearchParams(props.localtion.search).get(key) 获取参数

``` 
const params = new URLSearchParams(props.location.search)
const name = params.get('name')
console.log(name)
```

第三种: 通过querystring传递参数

``` 
const qs = require('querystring')

const params = qs.parse(props.location.search)
console.log(params)

// 输出结果: 前面有个问号需要自己处理
// {?name: "mystic", age: "123"}
```

4. router-link Object

``` 
<NavLink exact to={{
    pathname: 'mine',
    search: '?sort=name',
    hash: '#the-hash',
    state: {
        flag: true
    }
}} >mine</NavLink>
```

5. 重定向

Redirect使用场景: 注册登录跳转首页
基本使用

``` 
import {Redirect} from 'react-router-dom'
<Redirect from="/hello" to="/mine"></Redirect>
```

6. push和replace

push: 叠加路径, 可以返回
replace: 替代路径

``` 
import React from 'react'

const Mine = (props) => {
    console.log(props)

   const back = () => {
       props.history.push('/')
   }

   const replaceBack = () => {
        props.history.replace('/')
   }

    return (
        <div>
            Mine: id-{props.match.params.id}
            <button onClick={back}>push-回到首页</button>
            <button onClick={replaceBack}>replace-回到首页</button>
        </div>
    )
}

export default Mine
```

7. 高阶组件withRouter使用

作用: 可以让一个没有被路由对象管理组件拥有路由对象

``` 
import React from 'react'
import {withRouter} from 'react-router-dom'

class MineDemo extends React.Component {

    click() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <button onClick={this.click.bind(this)}>click</button>
            </div>
        )
    }
}

export default withRouter(MineDemo)

// 结果: {history: {…}, location: {…}, match: {…}, staticContext: undefined}
```

8. Prompt组件

应用场景: 在输入框存在内容进行页面跳转的时候, 会给用户一个是否确认离开的提示, 避免错误操作
两个参数: 

    when: boolean 
    message: 提示信息

``` 
import React from 'react'
import {Redirect, Prompt} from 'react-router-dom'

export default class Demo extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           name: ""
       }
   } 

   render() {
       return (
           <div>
               <Prompt
                    when= { !!this.state.name }
                    message = { '确定要离开吗' }
               />
               name:<input type="text" value={this.state.name} onChange={ e => this.setState({name: e.target.value}) } />
           </div>
       )
   }
}
```

### Redux

参考资料: http://cn.redux.js.org/index.html

1. 安装

    js的状态管理redux: npm install --save redux
    整合react的redux: npm install --save react-redux
    

``` 
// 使用redux的简单案例
// createStore 函数用于创建一个唯一仓库, 接受三个参数, 主要参数是第一个: reducer, 主要目的是为了将仓库与reducer进行关联
// reducer是用于改变store状态的纯函数
// subscribe用于监听数据变化
// getState()方法可以获取state的状态
// redux基本流程: store -> dispatch -> action -> reducer -> state

// reducer.js 文件
const counter =  (state = 0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1 
        default:
            return state
    }
}
export default counter

// index.js文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore} from 'redux'
import reducer from './store/reducers/counterReducer'

const store = createStore(reducer)

const render = () => {
    ReactDOM.render(<App
        onIncrement={ () => { store.dispatch({ type: 'INCREMENT' }) } }
        onDecrement={ () => { store.dispatch({ type: 'DECREMENT' }) } }
        value={store.getState()}
    />, document.getElementById('root'));
}
render()

store.subscribe(render)

// App.jsx文件
import React from 'react'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                App
                value: {this.props.value}
                <button onClick={this.props.onIncrement}>increment</button>
                <button onClick={this.props.onDecrement}>decrement</button>
            </div>
        )
    }
}
```

2. react-redux案例

``` 
// <Provider store={store}></Provider> 标签
// connect() 函数
// mapStateToProps
// mapDispatchTOProps
// bindActionsCreator()函数
// combineReducers()函数

// App.jsx文件
import React from 'react'
import {connect} from 'react-redux'
import * as actions from './store/actions/counterAction'
import {bindActionCreators} from 'redux'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        const { increment, decrement } = this.props
        return (
            <div>
                App
                value: {this.props.counter}
                <button onClick={() => this.props.counterAction.increment(10)}>increment</button>
                <button onClick={() => this.props.counterAction.decrement(20)}>decrement</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        counterAction: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// index.js文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers/counterReducer'

const store = createStore(reducer)

// const render = () => {
//     ReactDOM.render(<App
//         onIncrement={ () => { store.dispatch({ type: 'INCREMENT' }) } }
//         onDecrement={ () => { store.dispatch({ type: 'DECREMENT' }) } }
//         value={store.getState()}
//     />, document.getElementById('root'));
// }
// render()
// store.subscribe(render)

// 将组件与redux进行关联
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
```

3. combineReducers

``` 
import { combineReducers } from 'redux'
import counterReducer from './counterReducer'
import user from './userReducer'

export default combineReducers({
    counterReducer,
    user
})
```

4. applyMiddiewares

``` 
// 使用
npm install --save-dev redux-logger

import {createStore, applyMiddleware} from 'redux'
const store = createStore(combineReducers, {}, applyMiddleware(logger))
```

5. thunk异步处理中间件

``` 
npm install --save-dev redux-thunk

// counterAction.js文件 -> 在actions文件中写异步操作
export function increment(num) {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: actions.INCREMENT,
                num
            })
        },1000)
    }
}

// index.js 文件中加入中间件
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

const store = createStore(combineReducers, {}, applyMiddleware(logger, thunk))
```

6. redux-thunk网络请求

``` 
// 测试接口地址: http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php

// User.jsx文件
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../store/actions/userAction'

class User extends React.Component {
    render() {
        console.log(this.props.userState.user)
        return (
            <div>
                user: {this.props.userState.user.title}
                
                <button onClick={() => { this.props.userActions.get_user() }}>get_user</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userState: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(User)

// userReducer.js文件
import {FETCH_USER} from '../constant/constant'

const initState = {
    user: {}
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_USER:
            
            return {
                user: action.user
            }
        default:
            return state
    }
}

export default userReducer

// userActions.js文件
import {FETCH_USER} from '../constant/constant'

export function fetch_user(user) {
    return {
        type: FETCH_USER,
        user
    }
}

export const get_user = () => {
    return dispatch => {
        fetch('http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php')
        .then(res => res.json())
        .then(res => {
            dispatch(fetch_user(res.chengpinDetails[0]))
        })
    }
}

```

7. redux-thunk的三种状态

``` 
// User.jsx文件
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../store/actions/userAction'

class User extends React.Component {

    render() {
        console.log('User',this.props)

        const { user, error, isFetching } = this.props.user
        let data = ''

        if (error) {
            data = error
        } else if (isFetching) {
            console.log('isFecching',isFetching)
            data = 'loading'
        } else {
            data = user.title
        }
        console.log(data)

        return (
            <div>
                user: {
                    data
                }
                
                <button onClick={() => { this.props.userActions.get_user() }}>get_user</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(User)

// userReducer.js文件
import {FETCH_USER, FETCH_REQUEST, FETCH_ERROR} from '../constant/constant'

const initState = {
    user: {},
    isFetching: false,
    error: null
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_REQUEST:
            return {
                isFetching: true,
                error: null,
                user: {}
            }
        case FETCH_ERROR:
            return {
                isFetching: false,
                error: action.error
            }
        case FETCH_USER:
            return {
                isFetching: false,
                error: null,
                user: action.user
            }
        default:
            return state
    }
}

export default userReducer

// userAction.js
import {FETCH_USER, FETCH_REQUEST, FETCH_ERROR} from '../constant/constant'

export function fetch_user(user) {
    return {
        type: FETCH_USER,
        user
    }
}

export const fet_req = () => {
    return {
        type: FETCH_REQUEST
    }
}

export const fet_err = (error) => {
    return {
        type: FETCH_ERROR,
        error
    }
}

export const get_user = () => {
    return dispatch => {
        dispatch(fet_req())
        fetch('http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php')
        .then(res => res.json())
        .then(res => {
            dispatch(fetch_user(res.chengpinDetails[0]))
        })
        .catch(error => {
            dispatch(fet_err(error))
        })
    }
}
```

### redux调试工具

安装问题: 

    程序包无效参考地址: https://blog.csdn.net/qq_21729177/article/details/88063932
    redux-devtool-extension参考地址: https://github.com/zalmoxisus/redux-devtools-extension

1. 安装 

    chrome安装redux-devtool插件 (最好在chrome官方下载, 野鸡网站下载的插件一般用不了)
    npm install --save-dev redux-devtools-extension

2. 使用

``` 
    import { createStore, applyMiddleware } from 'redux';
    import { composeWithDevTools } from 'redux-devtools-extension';

    const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });
    const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
    ));
```

### react进阶 - 组件优化

1. 定时器任务 / 网络请求 / 事件监听等类似问题, 在组件销毁之前需要处理, 通过componentWillUnmount钩子函数

``` 
// 定时器案例

// IntervalComponent.jsx文件
import React from 'react'

export default class IntervalComponent extends React.Component {
    state = {
        count: 0,
        intervalId: null
    }

    my_api = {
        count: 0,
        intervalId: null,
        subscribe: function(cb) {
            this.intervalId = setInterval(() => {
                this.count += 1
                cb(this.count)
            },1000)
        },

        unSubcribe: function() {
            clearInterval(this.intervalId)
            this.reset()
        },

        reset() {
            this.count = 0
        }
    }

    // 页面挂载之后启用定时器
    componentDidMount() {
        this.my_api.subscribe(count => {
            this.setState({
                count:count
            })
        })
    }

    // 组件销毁的时候需要清除定时器
    componentWillUnmount() {
        this.my_api.unSubcribe()
    }

    render() {
        console.log(this.state.count)
        return (
            <div>
                data: { this.state.count }
            </div>
        )
    }
}

// Nav.jsx文件
import React from 'react'
import {HashRouter as Router, Route, Switch, NavLink, NavNavLink, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import Mine from '../pages/Mine'
import Ucenter from '../pages/Ucenter'
import NotFound from '../pages/NotFound'
import Demo from '../pages/Demo'
import IntervalComponent from './IntervalComponent'
import './style.css'

export default class Nav extends React.Component {
    render() {
        return (
            <div>
                
                
                <Router>
                    <ul>
                        <li>
                            <NavLink exact to="/">home</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={{
                                pathname: 'mine',
                                search: '?sort=name',
                                hash: '#the-hash',
                                state: {
                                    flag: true
                                }
                            }} >mine</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/mine/ucenter" >ucenter</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/demo" >demo</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/interval" >interval_com</NavLink>
                        </li>
                    </ul>
                   
                        <Switch>
                            <Redirect from="/hello" to="/mine"></Redirect>
                            <Route strict exact path="/" component={Home}></Route>
                            <Route strict exact path="/mine" component={Mine}></Route>
                            <Route strict exact path="/mine/ucenter" component={Ucenter}></Route>
                            <Route path="/demo" render={ (props) => <Demo {...props} title="hello"/> }></Route>
                            <Route path="/interval" component={IntervalComponent}></Route>

                            <Route component={NotFound}></Route>
                        </Switch>
                </Router>
            </div>
        )
    }
}
```

2. 利用shouldComponentUpdate(nextPorps, nextState) 钩子或者使用PureComponent进行嵌套组件的渲染问题优化

``` 
// 问题描述: {/* 嵌套组件的时候, 子组件的数据没有变化也会跟着父组件不断的渲染 */}

// IntervalComponent.jsx文件
import React from 'react'
import Child from './Child'

export default class IntervalComponent extends React.Component {
    state = {
        count: 0,
        intervalId: null
    }

    my_api = {
        count: 0,
        intervalId: null,
        subscribe: function(cb) {
            this.intervalId = setInterval(() => {
                this.count += 1
                cb(this.count)
            },1000)
        },

        unSubcribe: function() {
            clearInterval(this.intervalId)
            this.reset()
        },

        reset() {
            this.count = 0
        }
    }

    componentDidMount() {

        this.my_api.subscribe(count => {
            this.setState({
                count:count
            })
        })
    }

    componentWillUnmount() {
        this.my_api.unSubcribe()
    }

    render() {
        console.log('render->Parent')
        return (
            <div>
                {/* 嵌套组件的时候, 子组件的数据没有变化也会跟着父组件不断的渲染 */}
                data: { this.state.count }
                <Child num={1}/>
            </div>
        )
    }
}

// Child.jsx文件
import React from 'react'

export default class Child extends React.Component {

    // 这里判断下一次传递的值跟上一次的值是否一致, 如果一致则不去渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.num == this.props.num) {
            return false
        }
    }

    render () {
        console.log('render->Child')
        return (
            <div>
                child_data: {this.props.num}
            </div>
        )
    }
}
```

3. Fragment组件: 可以替代最外成充当包裹元素

``` 
import React, {Fragment} from 'react'

class Item extends React.Component {
    render () {
        return (
            <Fragment>
                <li>user1</li>
                <li>user2</li>
            </Fragment>
        )
    }
}

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <Item/>
                </ul>
            </div>
        )
    }
}
```

4. context

使用场景: 在获取非直接子路由的path路径的时候, 使用context可以比较容易的获取, 无需使用多级数据传递的方式

``` 
import React from 'react'
import PropTypes from 'prop-types'

const Topic = (props) => {
    return (
        <div>
            <Child color={props.color}/>
        </div>
    )
}

const Child = (props, context) => {
    console.log(context)
    return (
        <div>
            Child color: {context.color}
        </div>
    )
}

export default class Demo2 extends React.Component {
    getChildContext() {
        return {
            color: 'red'
        }
    }

    render() {
        return (
            <div>
                Demo2
                <Topic color="red"/>
            </div>
        )
    }
}

Child.contextTypes = {
    color: PropTypes.string
}

Demo2.childContextTypes = {
    color: PropTypes.string
}
```

### 高阶组件

1. 高阶组件是一个函数
2. 参数是一个组件
3. 返回值也是一个组件

``` 
// demo

// withFetch.jsx文件
import React from 'react'

const withFetch = (url) => (View) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null,
                isLoading: true
            }
        }

        componentDidMount() {
            fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    isLoading: false,
                    data: res.chengpinDetails[0]
                })
            })
        }

        render() {
            if (this.state.isLoading == true) {
                return <div>loading...</div>
            } else {
                return (
                    <View data={this.state.data} />
                )
            }
        }
    }
}

export default withFetch

// Index.jsx文件
import React from 'react'

const withFetch = (url) => (View) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null,
                isLoading: true
            }
        }

        componentDidMount() {
            fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    isLoading: false,
                    data: res.chengpinDetails[0]
                })
            })
        }

        render() {
            if (this.state.isLoading == true) {
                return <div>loading...</div>
            } else {
                return (
                    <View data={this.state.data} />
                )
            }
        }
    }
}

export default withFetch
```

4. 利用高阶组件进行错误处理边界(异常处理)

``` 
// ErrorBoundary.jsx 文件
import React from 'react'

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    }

    // 一旦程序执行异常, 就会执行这个函数
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo, errorInfo
        })
    }

    render() {
        if (this.state.hasError) {
        return <div>{ this.props.render(this.state.error, this.state.errorInfo) }</div>
        } else {
            return this.props.children
        }
    }
}

// Error.jsx文件
import React from 'react'

export default class Error extends React.Component {
    render() {
        return (
            <ul>
                {
                    null.map((ele, index) => {
                    return <li>{ele}</li>
                    })
                }
            </ul>
        )
    }
}

// Parent.jsx文件
import React from 'react'
import Error from './Error'
import ErrorBoundary from './ErrorBoundary'

export default class Parent extends React.Component {
    state = {
        count: 0
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            <div>
                Parent: {this.state.count}
                <ErrorBoundary render={(error, errorInfo) => '组件发生了错误'}>
                    <Error/>
                </ErrorBoundary>
                <button onClick={this.increment}>increment</button>
                <button onClick={this.decrement}>decrement</button>
            </div>
        )
    }
}
```



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import reducer from './store/reducers'


const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)))


// const logger = store => next => action => {
//     console.log('dispatch -> ' + action)
//     const result = next(action)
//     console.log('next state: ' + store.getState())
//     return result
// }


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
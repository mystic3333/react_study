import React from 'react'
import {connect} from 'react-redux'
import * as actions from './store/actions/counterAction'
import {bindActionCreators} from 'redux'
import User from './components/User'
import Nav from './components/Nav'
import Home from './components/Home'

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
                <User/>
                <Nav/>

                <Home/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)

    return {
        counter: state.counterReducer,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        counterAction: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


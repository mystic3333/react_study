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
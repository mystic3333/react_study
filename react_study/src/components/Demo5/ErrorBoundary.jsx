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
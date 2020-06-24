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
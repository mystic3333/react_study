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
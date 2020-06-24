import React from 'react'
import Child from './Child'

export default class Parent extends React.Component {
    state = {
        value: ''
    }

    handleClick = (param) => {
        this.setState({
            value: param
        })
    }

    render () {
        return (
            <div>
                Parent - {this.state.value}
                <Child title="children" handleClick={this.handleClick}/>
            </div>
        )
    }
}
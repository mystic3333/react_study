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
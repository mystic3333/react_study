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
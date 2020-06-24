import React from 'react'
import { render } from 'react-dom'

const withFetch = (ComposeComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div>
                    <ComposeComponent {...this.props}/>
                </div>
            )
        }
    }
}

const myData = (props) => {
    return (
        <div>
            myData: {props.title}
        </div>
    )
}

const WithFetch = withFetch(myData)

export default class Demo3 extends React.Component {
    render () {
        return (
            <div>
                <WithFetch title={'hello world'} />
            </div>
        )
    }
}
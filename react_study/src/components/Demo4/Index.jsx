import React from 'react'
import withFetch from './withFetch'

class Chengpin extends React.Component {
    render () {
        return (
            <div>
                data: {this.props.data.title}
            </div>
        )
    }
}

const NewComponent = withFetch('http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php')(Chengpin)

export default class Index extends React.Component {



    render() {
        return (
            <div>
                demo4
                <NewComponent/>
            </div>
        )
    }
}
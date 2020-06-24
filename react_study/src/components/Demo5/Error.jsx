import React from 'react'

export default class Error extends React.Component {
    render() {
        return (
            <ul>
                {
                    null.map((ele, index) => {
                    return <li>{ele}</li>
                    })
                }
            </ul>
        )
    }
}
import React from 'react'

const withFetch = (url) => (View) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null,
                isLoading: true
            }
        }

        componentDidMount() {
            fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    isLoading: false,
                    data: res.chengpinDetails[0]
                })
            })
        }

        render() {
            if (this.state.isLoading == true) {
                return <div>loading...</div>
            } else {
                return (
                    <View data={this.state.data} />
                )
            }
        }
    }
}

export default withFetch
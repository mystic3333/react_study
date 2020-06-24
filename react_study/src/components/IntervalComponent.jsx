import React from 'react'
import Child from './Child'

export default class IntervalComponent extends React.Component {
    state = {
        count: 0,
        intervalId: null
    }

    my_api = {
        count: 0,
        intervalId: null,
        subscribe: function(cb) {
            this.intervalId = setInterval(() => {
                this.count += 1
                cb(this.count)
            },1000)
        },

        unSubcribe: function() {
            clearInterval(this.intervalId)
            this.reset()
        },

        reset() {
            this.count = 0
        }
    }

    componentDidMount() {

        this.my_api.subscribe(count => {
            this.setState({
                count:count
            })
        })
    }

    componentWillUnmount() {
        this.my_api.unSubcribe()
    }

    render() {
        console.log('render->Parent')
        return (
            <div>
                {/* 嵌套组件的时候, 子组件的数据没有变化也会跟着父组件不断的渲染 */}
                data: { this.state.count }
                <Child num={1}/>
            </div>
        )
    }
}
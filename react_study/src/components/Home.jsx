import React from 'react'
// import Index from './Demo1/index'
// import Demo2 from './Demo2/Index'
// import Demo3 from './Demo3/Index'
// import Demo4 from './Demo4/Index'
import Parent from './Demo5/Parent'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                Home
                <Parent/>
                {/* <Index/>
                <Demo2/>
                <Demo3/>
                <Demo4/> */}
            </div>
        )
    }
}
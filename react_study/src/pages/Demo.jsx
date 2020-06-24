import React from 'react'
import {Redirect, Prompt} from 'react-router-dom'

export default class Demo extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           name: ""
       }
   } 

   render() {
       return (
           <div>
               <Prompt
                    when= { !!this.state.name }
                    message = { '确定要离开吗' }
               />
               name:<input type="text" value={this.state.name} onChange={ e => this.setState({name: e.target.value}) } />
           </div>
       )
   }
}
import React from 'react'
import {HashRouter as Router, Route, Switch, NavLink, NavNavLink, Redirect} from 'react-router-dom'
import Home from '../pages/Home'
import Mine from '../pages/Mine'
import Ucenter from '../pages/Ucenter'
import NotFound from '../pages/NotFound'
import Demo from '../pages/Demo'
import IntervalComponent from './IntervalComponent'
import './style.css'

export default class Nav extends React.Component {
    render() {
        return (
            <div>
                
                
                <Router>
                    <ul>
                        <li>
                            <NavLink exact to="/">home</NavLink>
                        </li>
                        <li>
                            <NavLink exact to={{
                                pathname: 'mine',
                                search: '?sort=name',
                                hash: '#the-hash',
                                state: {
                                    flag: true
                                }
                            }} >mine</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/mine/ucenter" >ucenter</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/demo" >demo</NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/interval" >interval_com</NavLink>
                        </li>
                    </ul>
                   
                        <Switch>
                            <Redirect from="/hello" to="/mine"></Redirect>
                            <Route strict exact path="/" component={Home}></Route>
                            <Route strict exact path="/mine" component={Mine}></Route>
                            <Route strict exact path="/mine/ucenter" component={Ucenter}></Route>
                            <Route path="/demo" render={ (props) => <Demo {...props} title="hello"/> }></Route>
                            <Route path="/interval" component={IntervalComponent}></Route>

                            <Route component={NotFound}></Route>
                        </Switch>
                </Router>
            </div>
        )
    }
}
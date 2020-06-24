import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../store/actions/userAction'


class User extends React.Component {


    render() {
        console.log('User',this.props)

        const { user, error, isFetching } = this.props.user
        let data = ''

        if (error) {
            data = error
        } else if (isFetching) {
            console.log('isFecching',isFetching)
            data = 'loading'
        } else {
            data = user.title
        }
        console.log(data)

        return (
            <div>
                user: {
                    data
                }
                
                <button onClick={() => { this.props.userActions.get_user() }}>get_user</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(User)
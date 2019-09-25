import React, {Component} from 'react';
import Register from './Register/Register'
import Login from './Login/Login'

class LoginGateway extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <h2>Register as a new User</h2>
                <Register handleRegister={this.props.handleRegister} />
                {/* <Login handleLogin={this.props.handleLogin} /> */}
            </div>
        )
    }
}

export default LoginGateway;
import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    state = {
        test: null
    }

    render() {
        return(
            <div className="row">
                <div className="col">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onKeyUp={this.props.emailInput} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onKeyUp={this.props.passwordInput} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button id="signUpBtn" onClick={this.props.signUpUser} type="submit" className="btn btn-primary">Create character</button>
                    <button id="logInBtn" onClick={this.props.logInUser} type="submit" className="btn btn-secondary">Log in</button>
                    <button id="logOutBtn" onClick={this.props.logOutUser} type="submit" className="btn btn-primary">Log out</button>
                </form>
                </div>
            </div>
        )
    }
} 

export default Login;
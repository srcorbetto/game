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
                    <p>{this.props.data}</p>
                </div>
            </div>
        )
    }
} 

export default Login;
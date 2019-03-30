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
                        <input onKeyUp={this.props.click} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        )
    }
} 

export default Login;
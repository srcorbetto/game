import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = props => {
    return (
        <div className="row">
            <div className="col">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onKeyUp={props.emailInput} type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onKeyUp={props.passwordInput} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <button id="signUpBtn" onClick={props.signUpUser} type="submit" className="btn btn-primary">
                    <Link to="/create">Create character</Link>
                </button>
                <button id="logInBtn" onClick={props.logInUser} type="submit" className="btn btn-secondary">
                    {/* <Link to="/play">Log in</Link> */}
                    Log in
                </button>
                <button id="logOutBtn" onClick={props.logOutUser} type="submit" className="btn btn-primary">
                    {/* <Link to="/signin">Log out</Link> */}
                    Log out
                </button>
            </form>
            </div>
        </div>
    )
}

export default Login;

// render() {
//     return(
        
//     )
// }
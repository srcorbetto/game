import React, { Component } from 'react';
import * as firebase from 'firebase';
import { config } from './firebaseConfig';
import { Link, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import './App.css';

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      console.log(firebaseUser);
      // logOut.classList.remove('hide');
  } else {
      console.log('Not logged in');
      // logOut.classList.add('hide');
  }
});

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  recordInput = e => {
    if (e.target.type === 'email') {
      const inputValue = e.target.value;
      // console.log(`Email Address: ${inputValue}`);
      this.setState({ email: inputValue });
    } else if (e.target.type === 'password') {
      const inputValue = e.target.value;
      // console.log(`Password: ${inputValue}`);
      this.setState({ password: inputValue });
    }
  }

  handleAuthState = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const auth = firebase.auth();
    const btnBeingPressed = e.target.id;
    if (btnBeingPressed === 'signUpBtn') {
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise
      .catch(e => console.log(e.message));
    } else if (btnBeingPressed === 'logInBtn') {
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise
      .catch(e => console.log(e.message));
    } else if (btnBeingPressed === 'logOutBtn') {
      firebase.auth().signOut();
    }
  }

  render() {
    return (
      <div className="App"> 
        <div className="container">
          <Route
            path="/bee"
            render={() => {
              <Login emailInput={this.recordInput}
                     passwordInput={this.recordInput}
                     signUpUser={this.handleAuthState}
                     logInUser={this.handleAuthState} 
                     logOutUser={this.handleAuthState}  
              />
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
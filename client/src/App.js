import React, { Component } from 'react';
import { auth, db } from './firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './redux/actions';
import Login from './components/Login/Login';
import './App.css';
import AframeView from './components/AframeView/AframeView';
import Gameplay from './components/Gameplay/Gameplay';
import Gameplay2 from './components/Gameplay2/Gameplay2';

class App extends Component {
state = {
  email: null,
  password: null,
  userDataPresent: false,
  info: null
  };

  componentWillMount() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const docRef = db.collection('users').doc(firebaseUser.uid);
        docRef.get().then(doc => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              //send to state
              this.props.handleInitCharacter(doc.data())
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch(error => {
          console.log("Error getting document:", error);
        });
        console.log(firebaseUser);
        const user = {
          email: firebaseUser.email,
          uid: firebaseUser.uid
        }
        this.props.handleUserLoggedIn(user);
      } else {
          console.log('Not logged in');
          // Need to clear ReduxLogger...
      }
    });
  }

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
    const btnBeingPressed = e.target.id;
    if (btnBeingPressed === 'signUpBtn' && email.length > 1 && password.length > 1) {
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise
      .then(e => {
        db.collection('users').doc(e.user.uid).set({
          email: e.user.email,
          uid: e.user.uid,
          color: '#f7f7f7',
          shape: 'box'
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      })
      .catch(e => {
        console.log(e.message);
      });
    } else if (btnBeingPressed === 'logInBtn' && email.length > 1 && password.length > 1) {
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise
      .catch(e => console.log(e.message));
    } else if (btnBeingPressed === 'logOutBtn') {
      auth.signOut();
      window.location = '/start'
    }
  }

  render() {
    return (
      <div className="App"> 
        <div className="container">
          <Route
            path="/start"
            render={() =>
              <Login emailInput={this.recordInput}
                     passwordInput={this.recordInput}
                     signUpUser={this.handleAuthState}
                     logInUser={this.handleAuthState} 
                     logOutUser={this.handleAuthState}  
              />
            }
          />
          <Route path="/create"
                 component={AframeView}
          />
          <Route path="/gameplay"
                 component={Gameplay}
          />
          <Route path="/gameplay2"
                 component={Gameplay2}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userEmail: state.userEmail,
      userUid: state.userUid
  }
}

const mapDispatchToProps = dispatch => {
  return {
      handleUserLoggedIn: payload => dispatch(actionCreators.userLoggedIn(payload)),
      handleInitCharacter: payload => dispatch(actionCreators.initCharacter(payload)),
      handleUserLoggedOut: () => dispatch(actionCreators.userLoggedOut())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
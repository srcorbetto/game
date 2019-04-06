import React, { Component } from 'react';
import 'aframe';
// import {Entity, Scene} from 'aframe-react';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions';

import './AframeView.css';

class AframeView extends Component {
    state = {
        color: 'green',
        shape: 'box'
    }

    toggleColor = keyPressed => {
        console.log(keyPressed.key);
        switch(keyPressed.key) {
            case 'm':
                this.setState({ color: 'maroon'})
                db.collection('users').doc(this.props.userUid).set({
                    color: 'maroon'
                }, {merge: true})
                break;
            case 'n':
                this.setState({ color: '#333333'})
                db.collection('users').doc(this.props.userUid).set({
                    color: '#333333'
                }, {merge: true})
                .catch(error => console.log(error))
                break;
            case 'b':
                this.setState({ color: 'brown'})
                break;
            case 'v':
                this.setState({ color: 'purple'})
                break;
            case 'o':
                this.setState({ shape: 'sphere'})
                break;
            case 'p':
                this.setState({ shape: 'cone'})
                break;
            default:
                console.log('Button not mapped')
        }
    }

   characterConfigure = e => {
        console.log(`Clicked: ${e}`);
        console.log(e.target.attributes[1].value)
    }

    componentDidMount() {
        document.addEventListener('keydown', this.toggleColor);
        // console.log(this.props.userUid)
        // const docRef = db.collection('users').doc(this.props.userUid);

        // docRef.get().then(doc => {
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function(error) {
        //     console.log("Error getting document:", error);
        // });
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
        console.log(this.props.userUid)
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="col-container">
                        <div className="control-holder">
                            <div onClick={this.characterConfigure} className="color black" data-flag="poop"></div>
                            <div className="color purple"></div>
                            <div className="shape cone"></div>
                            <div className="shape box"></div>
                        </div>
                        <div className="aframe-holder">
                            <a-scene embedded>
                                <a-plane position="0 0 -4"
                                        rotation="-90 0 0"
                                        width="4"
                                        height="4"
                                        color="#7BC8A4">
                                </a-plane>
                                <a-entity geometry={`primitive: ${this.state.shape}`}
                                        material={`color: ${this.props.userColor}`}
                                        position="0 1.25 -3.225"
                                        rotation="0 -28.9 0">
                                </a-entity>
                                <a-sky color="#ECECEC"></a-sky>
                            </a-scene>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userEmail: state.userEmail,
        userUid: state.userUid,
        userColor: state.userColor
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleUserLoggedIn: payload => dispatch(actionCreators.userLoggedIn(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AframeView);
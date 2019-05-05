import React, { Component } from 'react';
import 'aframe';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Joystick from '../Joystick/Joystick';
import * as actionCreators from '../../redux/actions';

import './Gameplay.css';

import * as utils from '../../api';

class Gameplay extends Component {
    state = {
        cameraPositionX: 0,
        objPositionX: 0,
        cameraPositionY: 1.6,
        objPositionY: 1.25,
        cameraPositionZ: 0.89982,
        objPositionZ: -3.225,
        isMoving: false
    }

    getActiveRoom = e => {
        // Need to wait until state is loaded
        db.collection('games').doc(this.props.activeRoom)
        .onSnapshot(doc => {
            console.log("Room data: ", doc.data());
        });
    }

    componentWillMount() {
    }

    componentDidMount() {
        utils.clientSignal();
        if (this.props.activeRoom !== null) {
            this.getActiveRoom();
        }
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
        // this.getActiveRoom();
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="col-container">
                        <Joystick />
                        <div className="aframe-holder">
                            <a-scene embedded>
                                <a-entity id="rig"
                                          position={`${this.props.objX} 3 ${this.props.objZ}`}
                                          rotation={`-12 0 0`}>
                                    <a-entity camera=""
                                        wasd-controls=""
                                        rotation=""
                                        look-controls=""
                                        aframe-injected="" data-aframe-inspector-original-camera="">
                                    </a-entity>
                                </a-entity>
                                <a-plane position="0 0 -4"
                                        rotation="-90 0 0"
                                        width="6"
                                        height="6"
                                        color="#7BC8A4">
                                </a-plane>
                                <a-entity geometry={`primitive: ${this.props.userShape}`}
                                        material={`color: ${this.props.userColor}`}
                                        position={`${this.props.charX} 1.25 ${this.props.charZ}`}
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
        userColor: state.userColor,
        userShape: state.userShape,
        activeRoom: state.activeRoom,
        charZ: state.charZ,
        objZ: state.objZ,
        charX: state.charX,
        objX: state.objX
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleUserLoggedIn: payload => dispatch(actionCreators.userLoggedIn(payload)),
        handleCustomizeCharacter: payload => dispatch(actionCreators.customCharacter(payload)),
        handleSaveCharacterBuild: payload => dispatch(actionCreators.saveCharacterBuild(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
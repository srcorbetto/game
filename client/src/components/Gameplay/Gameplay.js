import React, { Component } from 'react';
import 'aframe';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Joystick from '../Joystick/Joystick';
import * as actionCreators from '../../redux/actions';

import './Gameplay.css';

import * as utils from '../../api';

let movement;

// clientSignal();

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

    moveCharacter = e => {
        console.log(e.target.classList[1]);
        switch(e.target.classList[1]) {
            case 'left':
                movement = setInterval(() => {
                    this.setState({
                        cameraPositionX: this.state.cameraPositionX - .25,
                        objPositionX: this.state.objPositionX - .25
                    });
                    // Work through seeing character move...
                    const pos = this.state.cameraPositionX - .25;
                    utils.characterPosEmit(pos);
                }, 25);
                break;
            case 'right':
                movement = setInterval(() => {
                    this.setState({
                        cameraPositionX: this.state.cameraPositionX + .25,
                        objPositionX: this.state.objPositionX + .25
                    });
                }, 25)
                break;
            case 'forward':
                movement = setInterval(() => {
                    this.setState({
                        cameraPositionZ: this.state.cameraPositionZ - .25,
                        objPositionZ: this.state.objPositionZ - .25
                    });
                }, 25)
                break;
            case 'back':
                movement = setInterval(() => {
                    this.setState({
                        cameraPositionZ: this.state.cameraPositionZ + .25,
                        objPositionZ: this.state.objPositionZ + .25
                    });
                }, 25)
                break;
        }
    }

    stopCharacter = e => {
        // this.setState({isMoving: false});
        clearInterval(movement)
    }

    componentDidMount() {
        utils.clientSignal();
        console.log(this.props.charZ);
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="col-container">
                        <div className="control-holder">
                            <div onMouseDown={this.moveCharacter}
                                 onMouseUp={this.stopCharacter}
                                 className="controls left">
                            </div>
                            <div onMouseDown={this.moveCharacter}
                                 onMouseUp={this.stopCharacter}
                                 className="controls right">
                            </div>
                            <div onMouseDown={this.moveCharacter}
                                 onMouseUp={this.stopCharacter}
                                 className="controls forward">
                            </div>
                            <div onMouseDown={this.moveCharacter}
                                 onMouseUp={this.stopCharacter}
                                 className="controls back">
                            </div>
                        </div>
                        <Joystick />
                        <div className="aframe-holder">
                            <a-scene embedded>
                            <a-entity camera=""
                                      position={`0 1.6 ${this.props.objZ}`}
                                      wasd-controls=""
                                      rotation=""
                                      look-controls=""
                                      aframe-injected="" data-aframe-inspector-original-camera="">
                            </a-entity>
                                <a-plane position="0 0 -4"
                                        rotation="-90 0 0"
                                        width="6"
                                        height="6"
                                        color="#7BC8A4">
                                </a-plane>
                                <a-entity geometry={`primitive: ${this.props.userShape}`}
                                        material={`color: ${this.props.userColor}`}
                                        position={`0 1.25 ${this.props.charZ}`}
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
        charZ: state.charZ,
        objZ: state.objZ
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
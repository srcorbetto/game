import React, { Component } from 'react';
import 'aframe';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions';
import './Gameplay2.css';

import * as utils from '../../api';

let movement;

class Gameplay2 extends Component {
    state = {
        cameraPositionX: 0,
        objPositionX: 0,
        cameraPositionY: 1.6,
        objPositionY: 1.25,
        cameraPositionZ: -2.89982,
        objPositionZ: -6.225,
        isMoving: false,
        otherX: 1.25,
        otherZ: -2.89982
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
                }, 25)
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

    componentWillMount() {
        utils.socket.on('character move', characterPos => {
            console.log(characterPos);
            this.setState({otherX: characterPos});
        })
    }

    componentDidMount() {
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
                        <div className="aframe-holder">
                            <a-scene embedded>
                            <a-entity camera=""
                                      position={`${this.state.cameraPositionX} ${this.state.cameraPositionY} ${this.state.cameraPositionZ}`}
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
                                        position={`${this.state.objPositionX} ${this.state.objPositionY} ${this.state.objPositionZ}`}
                                        rotation="0 -28.9 0">
                                </a-entity>

                                {/* Test Shape */}
                                <a-entity geometry={`primitive: box`}
                                        material={`color: #f7f7f7`}
                                        position={`${this.state.otherX} 1.25 -10.225`}
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
        userShape: state.userShape
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleUserLoggedIn: payload => dispatch(actionCreators.userLoggedIn(payload)),
        handleCustomizeCharacter: payload => dispatch(actionCreators.customCharacter(payload)),
        handleSaveCharacterBuild: payload => dispatch(actionCreators.saveCharacterBuild(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay2);
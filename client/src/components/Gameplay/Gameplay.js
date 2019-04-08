import React, { Component } from 'react';
import 'aframe';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions';

import './Gameplay.css';

let interval;

class Gameplay extends Component {
    state = {
        cameraPosition: 0.89982,
        objPosition: -3.225,
        isMoving: false
    }

    moveCharacter = e => {
        interval = setInterval(() => {
            this.setState({
                cameraPosition: this.state.cameraPosition - .25,
                objPosition: this.state.objPosition - .25
            });
        }, 70)
    }

    stopCharacter = e => {
        // this.setState({isMoving: false});
        clearInterval(interval)
    }

    componentDidMount() {
        // window.addEventListener('mousedown', interval)
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
        console.log(this.props.userUid);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="col-container">
                        <div onMouseDown={this.moveCharacter} onMouseUp={this.stopCharacter} className="control-holder">
                        </div>
                        <div className="aframe-holder">
                            <a-scene embedded>
                            <a-entity camera=""
                                      position={`0 1.6 ${this.state.cameraPosition}`}
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
                                        position={`0 1.25 ${this.state.objPosition}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(Gameplay);
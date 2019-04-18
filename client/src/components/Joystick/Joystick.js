import React, { Component } from 'react';
import { auth, db } from '../../firebaseConfig';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import * as actionCreators from '../../redux/actions';

import './Joystick.css';

let movement;

class Joystick extends Component {
    state = {
        color: 'green',
        shape: 'box'
    }

    // Might need to be mousedown...constantly check the offset...
    getInfo = e => {
        movement = setInterval(() => {
            const joystickWrapperRef = document.getElementById('joystick-wrapper');
            const joystickRef = document.getElementById('joystick');
            const offsetX = joystickRef.getBoundingClientRect().x - joystickWrapperRef.getBoundingClientRect().x;
            const offsetY = joystickRef.getBoundingClientRect().y - joystickWrapperRef.getBoundingClientRect().y;
            console.log(offsetX, offsetY);
            if (offsetY < 25) {
                const payload = {
                    charZ: this.props.charZ - .10,
                    objZ: this.props.objZ - .10
                }
                console.log(payload);
                this.props.handleMoveCharacterForward(payload);
            } else if (offsetY > 25) {
                const payload = {
                    charZ: this.props.charZ + .10,
                    objZ: this.props.objZ + .10
                }
                console.log(payload);
                this.props.handleMoveCharacterForward(payload);
            }
        }, 25)
    }

    resetJoystick = e => {
        const joystickRef = document.getElementById('joystick');
        joystickRef.style.transform = 'none';
        clearInterval(movement);
    }

    componentDidMount() {
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
        // console.log(this.props.userUid);
    }

    render() {
        return (
            <div id="joystick-wrapper" className="joystick-wrapper">
                <Draggable onStart={this.getInfo}
                           onStop={this.resetJoystick}
                           bounds="parent">
                    <div id="joystick"
                         className="joystick">
                    </div>
                </Draggable>
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
        handleSaveCharacterBuild: payload => dispatch(actionCreators.saveCharacterBuild(payload)),
        handleMoveCharacterForward: payload => dispatch(actionCreators.moveCharForward(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Joystick);
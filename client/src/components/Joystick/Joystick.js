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

    // Might need to be mousedown...
    getInfo = e => {
        const offsetX = e.target.getBoundingClientRect().x - e.target.parentElement.getBoundingClientRect().x;
        const offsetY = e.target.getBoundingClientRect().y - e.target.parentElement.getBoundingClientRect().y;
        console.log(offsetX, offsetY);
        if (offsetY < 25) {
            movement = setInterval(() => {
                const payload = {
                    charZ: this.props.charZ - .15,
                    objZ: this.props.objZ - .15
                }
                console.log(payload);
                this.props.handleMoveCharacterForward(payload);
            }, 25)
        }
    }

    resetJoystick = e => {
        const joystickRef = document.getElementById('joystick');
        joystickRef.style.transform = 'none';
        // console.log(e.target)
    }

    componentDidMount() {
    }

    // Need to find a way to call after data is loaded...
    componentDidUpdate() {
        // console.log(this.props.userUid);
    }

    render() {
        return (
            <div className="joystick-wrapper">
                <Draggable onDrag={this.getInfo}
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
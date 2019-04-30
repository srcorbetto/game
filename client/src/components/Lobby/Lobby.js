import React, { Component } from 'react';
import { auth, db } from '../../firebaseConfig';
import { connect } from 'react-redux';
import { Link, Route, withRouter, browserHistory } from 'react-router-dom';
import randomWords from 'random-words';
import axios from 'axios';
import Gameplay from '../Gameplay/Gameplay';
import * as actionCreators from '../../redux/actions';

import './Lobby.css';

import * as utils from '../../api';

class Lobby extends Component {
    state = {
        test: 'test',
        roomName: null,
        roomData: []
    }

    // Can be consolidated...
    // Creating the socket room...
    setActiveRoom = e => {
        // Generate random word
        const roomName = randomWords();
        // create custom socket (room)
        // utils.createRoom(roomName);

        this.setState({
            roomName: roomName
        });

        // Add method to /gameplay...
        this.props.handleSetGameRoom(roomName);

        // Save active room to user profile...
        const docRef = db.collection('users').doc(this.props.userUid);
        docRef.set({
            activeRoom: roomName
        }, { merge: true })
        .then(console.log(`Active room set ${roomName}`))
        .then(this.generateGameRoom(roomName))
        .then(console.log('Room created'));
    }

    generateGameRoom = activeRoom => {
        const initGameData = {
            room: activeRoom,
            players: [
                {
                    startingX: 5,
                    startingY: 1,
                    startingZ: -3,
                    name: this.props.userName,
                    uid: this.props.userUid,
                    shape: this.props.userShape,
                    color: this.props.userColor
                }
            ]
        };
        db.collection('games').doc(activeRoom).set(initGameData, {merge: true})
        .then(console.log('Game data added'))
        .then(window.location = '/gameplay');
    }

    // This was to test if I can contain messaging to a room...
    pingRoom = () => {
        utils.socket.emit('say hello', {
            room: this.state.roomName,
            msg: 'Hello!'
        });
    }

    componentDidMount() {
        // this.generateGameRoom();
    }

    componentWillMount() {
        db.collection('games')
        .onSnapshot(querySnapshot => {
            // Clears the state before pulling new state
            this.setState({roomData: []});

            querySnapshot.forEach(doc => {
                this.setState({ roomData: [...this.state.roomData, doc.data()] })
                // console.log(doc.data());
            });
        });

        // Pushing the room to state...
        utils.socket.on('create room', roomName => {
            console.log(roomName);
        });

        // This needs to fire with the creation of the room and not the ping event...
        utils.socket.on('say hello', response => {
            console.log(response);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div onClick={this.setActiveRoom}
                         className="create-game-btn">
                         Create Game
                    </div>
                    <ul>
                        {this.state.roomData.map((game, i) => {
                            // Need to link to /gameplay
                            return <li onClick={this.logRoomName} key={i}><Link to="/gameplay">{game.room}</Link></li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userEmail: state.userEmail,
        userUid: state.userUid,
        userName: state.userName,
        userColor: state.userColor,
        userShape: state.userShape,
        activeRoom: state.activeRoom
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleSetGameRoom: payload => dispatch(actionCreators.setGameRoom(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
import React, { Component } from 'react';
import { auth, db } from '../../firebaseConfig';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
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
    generateGameRoom = e => {
        // Generate random word
        const roomName = randomWords();
        // create custom socket (room)
        utils.createRoom(roomName);
    }

    // This was to test if I can contain messaging to a room...
    pingRoom = () => {
        utils.socket.emit('say hello', {
            room: this.state.roomName,
            msg: 'Hello!'
        });
    }

    logRoomName = e => {
        console.log(e.target.innerHTML);
    }

    componentDidMount() {
        this.generateGameRoom();
    }

    componentWillMount() {
        db.collection('games')
        .onSnapshot(querySnapshot => {
            // Clears the state before pulling new state
            this.setState({roomData: []});
            querySnapshot.forEach(doc => {
                this.setState({ roomData: [...this.state.roomData, doc.data()] })
                console.log(doc.data());
            });
        });

        // Pushing the room to state...
        utils.socket.on('create room', roomName => {
            console.log(roomName);
            this.setState({
                roomName: roomName
            });
            this.props.handleSetGameRoom(roomName);
        });

        // This needs to fire with the creation of the room and not the ping event...
        utils.socket.on('say hello', response => {
            console.log(response);
            const initGameData = {
                room: this.state.roomName,
                players: [
                    {
                        name: 'test',
                        startingX: 5,
                        startingY: 1,
                        startingZ: -3,
                        uid: 'asdkjh45hksdfbsl776',
                        shape: 'cone',
                        color: 'purple'
                    }
                ]
            };
            db.collection('games').doc(this.state.roomName).set(initGameData, {merge: true})
            .then(console.log('Game data added'));
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div onClick={this.pingRoom}
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
        userUid: state.userUid
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        handleSetGameRoom: payload => dispatch(actionCreators.setGameRoom(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
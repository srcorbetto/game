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

// console.log(randomWords());

class Lobby extends Component {
    state = {
        test: 'test',
        roomName: null,
        roomData: []
    }

    generateGameRoom = e => {
        // Generate random word
        const roomName = randomWords();
        // create custom socket (room)
        utils.createRoom(roomName);
    }

    pingRoom = () => {
        utils.socket.emit('say hello', {
            room: this.state.roomName,
            msg: 'Hello!'
        });
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

        utils.socket.on('create room', roomName => {
            console.log(roomName);
            this.setState({
                roomName: roomName
            });
            this.props.handleSetGameRoom(roomName);
        })

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
            .then(console.log('Game data added'))
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div onClick={this.pingRoom}
                         className="create-game-btn">
                    </div>
                    <ul>
                        {this.state.roomData.map((game, i) => {
                            // Need to link to /gameplay
                            return <li key={i}><Link to="/gameplay">{game.room}</Link></li>
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
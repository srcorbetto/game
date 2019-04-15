import React, { Component } from 'react';
import { auth, db } from '../../firebaseConfig';
import { connect } from 'react-redux';
import randomWords from 'random-words';
import axios from 'axios';
import * as actionCreators from '../../redux/actions';

import './Lobby.css';

import * as utils from '../../api';

// console.log(randomWords());

class Lobby extends Component {
    state = {
        test: 'test',
        roomName: null
    }

    generateGameRoom = e => {
        // Generate random word
        const roomName = randomWords();
        // create custom socket (room)

        // axios.get(`/create-room?roomName=${roomName}`)
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(error => console.log(error))
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
        utils.socket.on('create room', roomName => {
            console.log(roomName);
            this.setState({
                roomName: roomName
            });
        })

        utils.socket.on('say hello', response => {
            console.log(response);
            const initGameData = {
                room: this.state.roomName,
                players: [
                    {
                        name: 'test',
                        x: 5,
                        y: 1,
                        z: -3,
                        uid: 'asdkjh45hksdfbsl776',
                        shape: 'cone',
                        color: 'purple'
                    }
                ]
            }
            db.collection('games').doc(this.state.roomName).set(initGameData, {merge: true})
            .then(console.log('Game data added'))
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div onClick={this.pingRoom}
                         className="create-game-btn">
                    </div>
                    <ul>

                    </ul>
                </div>
            </div>
        )
    }
}

export default Lobby;
import openSocket from 'socket.io-client';
export const socket = openSocket('http://localhost:5000');

export const clientSignal = () => {
    console.log('outside');
    socket.on('connection', msg => {
        console.log(msg);
    })
}

export const characterPosReceive = () => {
    // console.log('being hit');
    socket.on('character move', characterPos => {
        return characterPos;
    })
}

export const characterPosEmit = pos => {
    socket.emit('character move', pos);
}

export const createRoom = room => {
    socket.emit('create room', room);
}

// ===================================================
// TO DO:
// Rename import from utils. to something that makes more sense
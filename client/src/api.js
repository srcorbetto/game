import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

export const clientSignal = () => {
    console.log('outside');
    socket.on('connection', msg => {
        console.log(msg);
    })
}
import * as io from 'socket.io-client';
//var socket = require('socket.io-client')('http://localhost:8080');


export default class SocketService {

    constructor () {
        this.socket = null
    }

    static connect() {
        this.socket = io.connect('http://localhost:8080');
        if(this.socket) {
            console.log('Socket connected successfully');
        }
    }

    static getRooms() {
        this.socket.emit('rooms');
        console.log('Getting rooms...');
    };

    static roomListener(resolve) {
        this.socket.on('roomlist', roomList => {
            console.log('Received answer about rooms from server');
            resolve(roomList);
        })
    };


    static createUser(nickname) {
        return new Promise((resolve, reject) => {
            this.socket.emit('addUser', nickname, valid);
            if(valid) {
                resolve(true);
            } else{
                reject('Username Invalid');
            }
        })
    };
}
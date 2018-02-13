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
        console.log(this.socket.users); 
        //console.log('Getting rooms...');
    };

    static roomListener(resolve) {
        this.socket.on('roomlist', roomList => {
            //console.log('Received answer about rooms from server');
            resolve(roomList);
        })
    };

    static getUsers() {
        this.socket.emit('users');
        console.log('Getting users...');
    };

    static userListener(resolve) {
        this.socket.on('userlist', userList => {
            console.log('Received answer about users from server');
            console.log('userList: ');            
            console.log(userList);
            resolve(userList);
        })
    };

    static createUser(nickname) {
        return new Promise((resolve) => {
            this.socket.emit('adduser', nickname, function(valid) {
                if(valid) {
                    resolve(true);
                } else{
                    resolve(false);
                }
            });
        })
    };

    static joinRoom(roomName) {
        console.log('Joing Room...');
        this.socket.emit('joinroom', {room: roomName}, function(success, reason) {
            if(success) {
                console.log('Joined Room');
            } else{
                console.log('Failed to join Room');
                console.log(reason);    
            }
        });   
    };

}
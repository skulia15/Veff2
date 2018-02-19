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

    // Request a list of all rooms
    static getRooms() {
        this.socket.emit('rooms');
    };

    // Listens to when server responds with list of rooms
    static roomListener(resolve) {
        this.socket.on('roomlist', roomList => {
            //console.log('Received answer about rooms from server');
            resolve(roomList);
        })
    };
    // Request a list of all users
    static getUsers() {
        this.socket.emit('users');
        console.log('Getting users...');
    };

    // Listen to when server responds with a list of users
    static userListener(resolve) {
        this.socket.on('userlist', userList => {
            console.log('Received answer about users from server');
            console.log('userList: ');            
            console.log(userList);
            resolve(userList);
        })
    };

    // Create a new user with nickname
    static createUser(nickname) {
        return new Promise((resolve) => {
            this.socket.emit('adduser', nickname, (valid) => {
                if(valid) {
                    this.getUsers();
                    resolve(valid);
                } else{
                    resolve(false);
                }
            });
        })
    };

    // Leave a room
    static leaveRoom(roomName) {
        console.log('Leaving Room...', roomName);
        this.socket.emit('partroom', roomName);   
    };

    
    // Add a user to a room
    static joinRoom(roomName) {
        console.log('Joing Room ' + roomName + '...');
        this.socket.emit('joinroom', {room: roomName}, (success, reason) => {
            if(success) {
                console.log('Joined Room ', roomName);
                this.getRooms();
                return success;
            } else{
                console.log('Failed to join Room');
                console.log(reason);    
                return reason;
            }
        });   
    };

    // Handles sending messages to room
    static sendMessage(contents) {
        console.log('Sending message...');
        this.socket.emit('sendmsg', contents);   
    };

    // Listens to when the chat updates
    static messageListener(resolve) {
        this.socket.on('updatechat', (room, updatedChat) => {
            console.log('Chat has been updated');
            resolve(room, updatedChat);
        })
    }

    // Listens to the event when there is a change in users in room
    static usersInChatListener(resolve) {
        this.socket.on('updateusers',  (room, updatedUsers, updatedOPs) => {
            resolve(room, updatedUsers, updatedOPs);
        });
    }

    // Create a new room and set topic for that room
    static createRoom(roomName, topic, resolve) {
        this.socket.emit('joinroom', {room: roomName}, (success, reason) => {
            if(success) {
                // Set a topic for a room
                this.socket.emit('settopic',  {topic: topic, room: roomName}, (success) => {
                    if(success) {
                        console.log('Topic successfully set for ', roomName);                        
                        resolve(true);
                    } else {
                        console.log('Failed to set topic for ', roomName);
                        resolve(false);
                    }
                });
                resolve(true);
            } else{
                console.log('Failed to join Room');
                console.log(reason);    
                resolve(false);
            }
        });   
    };

}
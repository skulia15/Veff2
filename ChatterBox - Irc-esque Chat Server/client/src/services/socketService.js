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
            resolve(roomList);
        })
    };
    // Request a list of all users
    static getUsers() {
        this.socket.emit('users');
    };

    // Listen to when server responds with a list of users
    static userListener(resolve) {
        this.socket.on('userlist', userList => {
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
        this.socket.emit('sendmsg', contents);   
    };

    // Listens to when the chat updates
    static messageListener(resolve) {
        this.socket.on('updatechat', (room, updatedChat) => {
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
                // Set a topic for a room only if it has been provided
                if(topic !== undefined && topic !== '') {
                    this.socket.emit('settopic',  {topic: topic, room: roomName}, (success) => {
                        if(success) {
                            console.log('Topic successfully set for ', roomName);                        
                            resolve(true);
                        } else {
                            console.log('Failed to set topic for ', roomName);
                            resolve(false);
                        }
                    });
                }
                resolve(true);
            } else{
                console.log('Failed to join Room because' + reason);
                resolve(false);
            }
        });   
    };

    // Adds the user to the list of op's in room
    static makeUserOp(nickname, roomName, resolve) {
        let contents = {room: roomName, user: nickname}
        this.socket.emit('op',  contents, (success) => {
            if(success) {
                console.log('Made user ' + nickname + ' Op in room ' + roomName);
                resolve(success);
            }
            resolve(false);
        });
    }

    // Removes Op access from user
    static removeOpFromUser(nickname, roomName, resolve) {
        let contents = {room: roomName, user: nickname}
        this.socket.emit('deop',  contents, (success) => {
            if(success) {
                console.log('Removed op from user ' + nickname);
                resolve(success);
            }
            resolve(false);
        });
    }
    

    // Removes the user from the room
    static kickUser(nickname, roomName, resolve) {
        let contents = {room: roomName, user: nickname}
        this.socket.emit('kick',  contents, (success) => {
            if(success) {
                console.log('Kicked user ' + nickname + ' from room ' + roomName);
                resolve(success);
            }
            resolve(false);
        });
    }

    // Bans the user from the room
    static banUser(nickname, roomName, resolve) {
        let contents = {room: roomName, user: nickname}
        this.socket.emit('ban',  contents, (success) => {
            if(success) {
                console.log('Banned user ' + nickname + ' from room ' + roomName);
                resolve(success);
            }
            resolve(false);
        });
    }

    // When the server emits a message. On partroom, joinroom and disconnect
    static serverMessageListener() {
        this.socket.on('servermessage',  (type, room, username) => {
            this.getRooms();
            if(type === 'part') {
                console.log('User ' + username + ' Parted room ' + room);
                // send message to room
                //let messageContents = {msg: username + ' left the room', roomName: room};
                //this.sendMessage(messageContents);
            }
            if(type === 'join') {
                console.log('User ' + username + ' joined room ' + room);
                // send message to room
                // let messageContents = {msg: username + ' joined the room', roomName: room};
                // this.sendMessage(messageContents);
            }
            if(type === 'quit') {
                // Send to all rooms user is part of
                console.log('User ' + username + ' Left ChatterBox ');
                console.log('User ' + username + ' is part of these rooms:');
                console.log(room);
                // send message to room
            }
        });
    }

    // Sends a private message to a user
    static sendPrivateMessage(nickname, message) {
        let contents = {nick: nickname, message: message};
        this.socket.emit('privatemsg',  contents, (success) => {
            if(success) {
                console.log('message sent');
            } else{ 
                console.log('failed to send message');
            }
        });
    }

    // Listens to the event when user receives a private message
    static privateMessageListener(resolve) {
        this.socket.on('recv_privatemsg',  (messageFrom, message) => {
            resolve(messageFrom, message);
        });
    }

}
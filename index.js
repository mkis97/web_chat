var express = require('express');
var socket = require('socket.io');

var app = express()

let numberOfUsers = []

var server = app.listen(4000)

app.use(express.static('public'))

var io = socket(server)

io.on('connection', (socket) => {
    numberOfUsers.push(socket)
    console.log('connection: : ', socket.id)
    console.log('users: ', numberOfUsers.length)

    io.sockets.emit("con", numberOfUsers.length)

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)
    })

    socket.on('disconnect', function (data) {
        numberOfUsers.splice(numberOfUsers.indexOf(socket), 1)
        console.log('connection: : ', socket.id)
        console.log('users: ', numberOfUsers.length)
        io.sockets.emit('dis', numberOfUsers.length)
    })
})

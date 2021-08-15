const path = require('path')
const express = require('express')
const http = require('http')
const sockets = require('socket.io')

const app = express()
const server = http.Server(app)
const io = sockets(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const connections = {
  idk: {
    id: 'idk',
    name: 'someone',
    currentRoom: 'hi'
  }
}

const rooms = {
  hi: {
    id: 'hi',
    name: 'cool room',
    purpose: 'room for cool people',
    creator: 'idk',
    members: {
      idk: 'someone'
    }
  }
}

const conn = (socket) => ({
  id: socket.id,
  name: 'Ollie ' + Object.keys(connections).length,
  currentRoom: null
})

io.on('connection', socket => {
  console.log(socket.id, 'connected')
  connections[socket.id] = conn(socket)

  socket.on('create-room', (data) => {
    data.creator = socket.id
    data.members = { [socket.id]: connections[socket.id].name }

    rooms[data.id] = data

    socket.emit('open sesame', rooms[data.id])
  })

  socket.on('join-room', (roomName) => {
    const id = socket.id
    const name = connections[socket.id].name

    if (rooms[roomName]) {
      console.log(id, 'has joined room:', roomName)
      
      connections[id].currentRoom = roomName
      socket.join(roomName)
      rooms[roomName].members[id] = name

      socket.emit('open sesame', rooms[roomName])
      socket.broadcast.to(roomName).emit('member joined', { id, name })
    } else {
      socket.emit('no room', roomName)
    }
  })

  socket.on('disconnect', () => {
    const id = socket.id
    const room = connections[id].currentRoom

    if (room) {
      delete rooms[room].members[id]
      socket.broadcast.to(room).emit('member left', id)
    }

    delete connections[id]
  })
})

module.exports = server

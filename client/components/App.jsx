import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io()

import './App.css'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Room from './Room'

function App() {

  const [page, setPage] = useState('join')
  const [room, setRoom] = useState(null)
  const [user, setUser] = useState(null)

  const initSockets = () => {
    socket.on("connect", () => {
      console.log('connected as id', socket.id)
      setUser({ ...user, id: socket.id })
    })

    socket.on('disconnect', () => {
      console.log('connection to websocket server was lost')
    })

    socket.on('open sesame', (data) => {
      console.log('connected to room', data)
      setRoom(data)
    })
  }

  useEffect(() => {
    initSockets()
  }, [])

  useEffect(() => {
    if (room) setPage('room')
  }, [room])

  return (
    <div className="app">
      EDA Dot Votes!!
      {page === 'join' && <>
        <JoinRoom socket={socket} />
        <button onClick={() => setPage('create')}>Create new room?</button>
      </>}
      {page === 'create' && <>
        <CreateRoom socket={socket} />
        <button onClick={() => setPage('join')}>Join existing room?</button>
      </>}
      {page === 'room' && <Room socket={socket} room={room} user={user} />}
    </div>
  )
}

export default App

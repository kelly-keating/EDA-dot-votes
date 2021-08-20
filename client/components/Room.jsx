import React, { useEffect, useState } from 'react'

import HostTools from './HostTools'

function Room({ socket, room, user }) {

  const [members, setMembers] = useState(room.members)

  const initSockets = () => {
    socket.on('member joined', (data) => {
      console.log('member joined', data)
      addMember(data.id, data.name)
    })

    socket.on('member left', (data) => {
      console.log(data, 'disconnected from room')
      removeMember(data)
    })
  }

  useEffect(() => {
    initSockets()
  }, [])

  const addMember = (id, name) => {
    setMembers({ ...members, [id]: name })
  }

  const removeMember = (id) => {
    const newMembers = { ...members }
    delete newMembers[id]
    setMembers(newMembers)
  }

  const isHost = user.id === room.creator

  return (
    <div className="room">
      <h1>Room {room.name}</h1>
      Admin: {isHost ? 'You are!' : members[room.creator]}
      {isHost && <HostTools socket={socket} />}
      <h3>Members:</h3>
      <ul>
        {Object.keys(members).map(id => <li key={id}>{members[id]}</li>)}
      </ul>
    </div>
  )
}

export default Room

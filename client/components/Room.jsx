import React, { useEffect, useState } from 'react'

function Room({ socket, room, addMember }) {

  const [members, setMembers] = useState([])

  const initSockets = () => {
    socket.on('member joined', (data) => {
      console.log('member joined', data)
      addMember(data.id, data.name)
    })
  }

  useEffect(() => {
    initSockets()
  }, [])

  useEffect(() => {
    const newMembers = Object.values(room.members)
    console.log('log', newMembers.length)
    if (newMembers.length !== members.length) {
      setMembers(newMembers)
    }
  }, [ room ])


  return (
    <div className="room">
      <h1>Room {room.name}</h1>
      <h3>Members:</h3>
      <ul>
        {members.map(member => <li key={member}>{member}</li>)}
      </ul>
    </div>
  )
}

export default Room

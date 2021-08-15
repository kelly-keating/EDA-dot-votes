import React, { useEffect, useState } from 'react'

function JoinRoom({ socket }) {

  const [roomCode, setRoom] = useState('')

  const type = (e) => {
    setRoom(e.target.value)
  }

  const handleSub = (e) => {
    e.preventDefault()
    socket.emit('join-room', roomCode)
  }

  return (
    <div className="joinRoom">
      <form onSubmit={handleSub}>
        <label>
          Room code:
          <input type='text' onChange={type} placeholder='abcde' />
        </label>
      </form>
    </div>
  )
}

export default JoinRoom

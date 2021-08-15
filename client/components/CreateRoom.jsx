import React, { useEffect, useState } from 'react'

function CreateRoom ({ socket }) {

  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    id: ''
  })

  const handleType = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSub = (e) => {
    e.preventDefault()
    socket.emit('create-room', formData)
  }

  return (
    <div className="createRoom">
      <form onSubmit={handleSub}>
        <label>
          Room name:
          <input type='text' name='name' onChange={handleType} placeholder='' />
        </label>
        <label>
          Purpose:
          <input type='text' name='purpose' onChange={handleType} placeholder='' />
        </label>
        <label>
          Room code:
          <input type='text' name='id' onChange={handleType} placeholder='' />
        </label>
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateRoom

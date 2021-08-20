import React, { useEffect, useState } from 'react'

function HostTools({ socket }) {

  const [newSurvey, setNewSurvey] = useState(false)
  const [formDeets, setFormDeets] = useState({
    creator: socket.id // TODO: longevity - relate to auth user
  })

  const initSockets = () => {
    // socket.on('member joined', (data) => {
    //   console.log('member joined', data)
    //   addMember(data.id, data.name)
    // })
  }

  useEffect(() => {
    initSockets()
  }, [])

  const renderSurvey = () => {
    return <form>
      Title
      Fiel
    </form>
  }

  return (
    <div className="host-tools">
      <h3>Host tools:</h3>
      <button>Add Survey</button>
      {newSurvey && renderForm()}
    </div>
  )
}

export default HostTools

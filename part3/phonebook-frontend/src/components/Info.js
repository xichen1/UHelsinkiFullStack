import React from 'react'

const Info = ({ message, success }) => {
  const suc = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const err = {...suc, color:'red'}
  if (message === null) {
    return null
  } else if (message !== null && success) {
    return (
      <div style={suc}>
        {message}
      </div>
    )
  } else if (message !== null && ! success) {
    return (
      <div style={err}>
        {message}
      </div>
    )
  }
}

export default Info
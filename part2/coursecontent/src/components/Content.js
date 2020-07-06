import React from 'react'

import Part from './Part.js'

const Content = ({ parts }) => {
    return (
      <>
          {parts.map(part => 
          <Part key={part.id} text={part.name} exercises={part.exercises} />)
          }
      </>
    )
}

export default Content
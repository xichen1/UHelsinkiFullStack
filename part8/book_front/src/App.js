import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Newbook from './components/Newbooks'

function App() {
  const [showAuthor, setShowAuthor] = useState(true)
  const [showBooks, setShowBooks] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)

  const changeToAuthor = () => {
    // event.preventDefault()
    setShowAuthor(true)
    setShowBooks(false)
    setShowNewForm(false)
  }

  const changeToBooks = () => {
    // event.preventDefault()
    setShowBooks(true)
    setShowAuthor(false)
    setShowNewForm(false)
  }

  const changeToNewForm = () => {
    setShowBooks(false)
    setShowAuthor(false)
    setShowNewForm(true)
  }

  return (
    <div>
      <button onClick={changeToAuthor}>authors</button>
      <button onClick={changeToBooks}>books</button>
      <button onClick={changeToNewForm}>new book</button>
      {showAuthor ? <Authors /> : null}
      {showBooks ? <Books /> : null}
      {showNewForm ? <Newbook /> : null}
    </div>
  )
}

export default App;

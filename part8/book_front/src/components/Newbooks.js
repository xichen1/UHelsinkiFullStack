import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHOR, ALL_BOOKS } from '../queries'

const Newbooks = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPubilshed] = useState('')
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')

  const [addBook] = useMutation(CREATE_BOOK,
    { refetchQueries: [{ query: ALL_AUTHOR }, { query: ALL_BOOKS }] })

  const addGenre = (event) => {
    event.preventDefault()
    if (genre !== '') {
      setGenres(genres.concat(genre))
    }
  }

  const createBook = (event) => {
    event.preventDefault()
    console.log(genres)
    addBook({ variables: { title, author, published, genres } })

    setTitle('')
    setAuthor('')
    setGenre('')
    setPubilshed('')
    setGenres([])
  }

  return (
    <form onSubmit={createBook}>
      <div>
        title
      <input value={title}
          onChange={({ target }) =>
            setTitle(target.value)}
        />
      </div>
      <div>
        author <input value={author}
          onChange={({ target }) =>
            setAuthor(target.value)
          }
        />
      </div>
      <div>
        published <input value={published} type='number'
          onChange={({ target }) =>
            setPubilshed(+target.value)
          }
        />
      </div>
      <div>
        genre <input value={genre}
          onChange={({ target }) => {
            setGenre(target.value)
          }}
        />
        <button onClick={addGenre}>add genre</button>
      </div>
      <div>genres: {genres.map(g => g)}</div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default Newbooks
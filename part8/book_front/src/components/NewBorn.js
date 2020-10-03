import React, { useState } from 'react'
import { EDIT_BIRTH, ALL_AUTHOR, ALL_BOOKS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

const NewBorn = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const authorResult = useQuery(ALL_AUTHOR)

  const options = authorResult.data.allAuthors.map(a =>
    ({ value: a.name, label: a.name })
  )

  const [editBirth] = useMutation(EDIT_BIRTH,
    { refetchQueries: [{ query: ALL_AUTHOR }, { query: ALL_BOOKS }] })

  const handleSubmit = (event) => {
    event.preventDefault()

    editBirth({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birthday</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        {/* <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div> */}
        <div>
          born <input type='number' value={born} onChange={({ target }) => setBorn(+ target.value)} />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default NewBorn
import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHOR } from '../queries'
import NewBorn from './NewBorn'

const Authors = () => {
  const result = useQuery(ALL_AUTHOR)

  if (result.data == null) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map(p => (
            <tr key={p.name}>
              <td >{p.name}</td>
              <td>{p.born ? p.born : "null"}</td>
              <td>{p.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewBorn />
    </div>
  )
}
export default Authors
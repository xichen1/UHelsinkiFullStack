import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const Books = () => {

  const result = useQuery(ALL_BOOKS)
  if (result.data == null) {
    return (
      <div>loading</div>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map(b =>
            (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
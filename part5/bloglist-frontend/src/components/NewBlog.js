import React, { useState } from 'react'

const NewBlog = ({ addBlog }) => {
    const [newblog, setNewBlog] = useState('')
    const [newauthor, setNewAuthor] = useState('')
    const [newurl, setNewUrl] = useState('')

    const createNew = (event) => {
        event.preventDefault()
        const blog = { title: newblog, author: newauthor, url: newurl }
        addBlog(blog)
        setNewBlog('')
        setNewUrl('')
        setNewAuthor('')
    }

    return (
        <form onSubmit={createNew}>
            <div>
                title: <input
                    type='text'
                    value={newblog}
                    onChange={({ target }) => setNewBlog(target.value)}
                />
            </div>
            <div>
                author: <input type='text'
                    value={newauthor}
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
            </div>
            <div>
                url: <input type='text'
                    value={newurl}
                    onChange={({ target }) => setNewUrl(target.value)}
                />
            </div>

            <button type='submit'>post</button>
        </form>
    )
}

export default NewBlog
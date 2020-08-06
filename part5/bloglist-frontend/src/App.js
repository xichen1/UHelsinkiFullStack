import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newblog, setNewBlog] = useState('')
  const [newauthor, setNewAuthor] = useState('')
  const [newurl, setNewUrl] = useState('')
  const [info, setInfo] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setInfo('invalid username or password')
      setTimeout(() => {
        setInfo('')
      }, 5000)
    }
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const res = await blogService.postnew({ title: newblog, author: newauthor, url: newurl })
      setBlogs(blogs.concat(res))
      setInfo(res.title, res.author)
      setTimeout(() => {
        setInfo('')
      }, 5000)
    } catch (exception) {
      setInfo('invalid blog')
      setTimeout(() => {
        setInfo('')
      }, 5000)
    }

  }



  const logoutButton = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.href = '../../'
  }

  let afterlog = null
  if (user === null) {
    afterlog = (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text"
            value={username}
            name='username'
            onChange={({ target }) =>
              setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input type="password"
            value={password}
            name='password'
            onChange={
              ({ target }) => setPassword(target.value)
            }
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  } else {
    afterlog = (
      <div>
        <div>
          <h3>Create new</h3>
          <form onSubmit={handleNewBlog}>
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
        </div>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <button onClick={logoutButton}>logout</button>
        </div>
      </div>

    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={info} />
      {afterlog}
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState('')

  const compareLike = (bloga, blogb) => {
    if (bloga.likes < blogb.likes) {
      return 1
    }
    return -1
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareLike)
      setBlogs(blogs)
    }
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

  const addBlog = async (blogObject) => {
    try {
      const res = await blogService.postnew(blogObject)
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
      <Toggleable buttonname='show login'>
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
      </Toggleable>

    )
  } else {
    afterlog = (
      <div>
        <div>
          <Toggleable buttonname='show create new'>
            <h3>Create new</h3>
            <NewBlog addBlog={addBlog} />
          </Toggleable>
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
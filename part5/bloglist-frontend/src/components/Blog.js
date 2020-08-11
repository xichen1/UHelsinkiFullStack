import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
  const [newblog, setNewBlog] = useState(blog)
  const [visible, setVisbile] = useState(false)
  const [btnName, setBtnName] = useState('show')
  const [removed, setRemoved] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeButton = () => {
    if (visible) {
      setBtnName('show')
    } else {
      setBtnName('hide')
    }
    setVisbile(!visible)
  }

  const hidecontrol = {
    display: visible ? '' : 'none',
  }

  const newLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    try {
      const res = await blogService.addLike(blogObject)
      setNewBlog(blogObject)
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      event.preventDefault()
      try {
        const res = await blogService.deleteBlog(blog)
        setRemoved(true)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  if (removed) {
    return null
  }

  return (
    <div style={blogStyle}>
      <div>
        {newblog.title}
        <button onClick={changeButton}>{btnName}</button>
      </div>
      <div style={hidecontrol}>
        {newblog.url}<br />
        likes {newblog.likes}<button onClick={newLike}>like</button><br />
        {newblog.author}<br />
        <button onClick={deleteBlog}>remove</button>
      </div>

    </div>)
}

export default Blog

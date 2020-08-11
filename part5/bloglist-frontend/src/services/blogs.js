import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newtoken => {
  token = `bearer ${newtoken}`
}

const postnew = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.delete(url, config)
  return response
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.put(url, blog, config)
  return response.data
}

export default { getAll, setToken, postnew, addLike, deleteBlog }
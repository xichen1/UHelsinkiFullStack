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
  console.log(blog)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}
export default { getAll, setToken, postnew }
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const getall = () => {
    const request = axios.get(baseUrl)
    return (request.then(response => response.data))
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletename = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const replacename = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getall, create, deletename, replacename }

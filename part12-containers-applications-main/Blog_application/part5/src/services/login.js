import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)

  return response.data
}

const getUsers = async user => {
  const response = await axios.get('/api/users', { headers : { Authorization : `Bearer ${user.token}` } })

  return response.data
}

const exportObject = { login, getUsers }

export default exportObject
import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async (user) => {
  console.log(user)
  if (user === null){
    console.log('no user')
    const request = await axios.get(baseUrl)
    return request.data
  }
  else{
    const request = await axios.get(baseUrl, { headers : { Authorization : `Bearer ${user.token}` } })
    console.log(request)
    return request.data
  }
}

const createBlog = async (data, user) => {
  const request = await axios.post(baseUrl, data, { headers : { Authorization : `Bearer ${user.token}` } })
  return request.data
}

const increaseLikes = async (data, blogId, user) => {
  let tempURL = baseUrl+`/${blogId}`
  const request = await axios.put(tempURL, data, { headers : { Authorization : `Bearer ${user.token}` } })
  return request.data
}

const deleteBlog = async (blogId, user) => {
  let tempURL = baseUrl+`/${blogId}`
  console.log(blogId)
  console.log(user)
  const request = await axios.delete(tempURL, { headers : { Authorization : `Bearer ${user.token}` } })
  console.log(request.data)
  return request.data
}

const addComment = async (data, blogId, user) => {
  let tempURL = baseUrl+`/${blogId}/comments`
  console.log(user.token)
  const request = await axios.post(tempURL, data, { headers: { Authorization: `Bearer ${user.token}` } })
  return request.data
}

const exportObject = { getAll, createBlog, increaseLikes, deleteBlog, addComment }

export default exportObject
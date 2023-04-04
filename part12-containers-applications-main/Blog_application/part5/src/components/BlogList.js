import React from 'react'
import BlogForm  from './CreateBlog'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'




const Blogs = () => {

  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  const handleBlogCreation = async (blogObject) => {
    await blogService.createBlog(blogObject, selector.user)
    const response = await blogService.getAll(selector.user)
    dispatch(setBlogs(response))
  }

  return (<p>
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={handleBlogCreation}/>
    </Togglable><br></br>
    <Blog />
  </p>
  )
}

export default Blogs
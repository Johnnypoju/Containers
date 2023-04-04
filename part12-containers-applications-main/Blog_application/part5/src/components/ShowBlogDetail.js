import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeIncrease, removeBlogs, addComment } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'


const BlogDetails = (blogdata) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const [ comment, setComment ] = useState('')


  const handleLikeIncrease = async () => {
    dispatch(likeIncrease({ ...blogdata.blogdata, likes: blogdata.blogdata.likes+1 }, blogdata.blogdata.id, selector.user))
  }

  useEffect(() => {

  }, [blogdata])
  const handleBlogDeletion = async () => {

    dispatch(removeBlogs(blogdata.blogdata.id, selector.user))
    navigate('/blogs')

  }

  /*const moreLikes = async (event) => {

    likeIncrease({
      userId: blog.userId._id,
      likes: likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
    setLikes(likes + 1 )
  }*/

  /*const handleDeletion = async (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }*/

  const handleSubmit = () => {
    console.log(comment)

    const tempBlog = {
      ...blogdata.blogdata,
      comments: [ ...blogdata.blogdata.comments, comment ]

    }
    console.log(tempBlog)
    dispatch(addComment(tempBlog, blogdata.blogdata.id, selector.user))
  }

  const CommentForm = () => {
    return (
      <p className='blog'>{blogdata.blogdata.comments.map((comment, index) => <li key={index}>{comment}</li>)}</p>
    )
  }

  const BlogForm = (blogURL) => {
    return (
      <div className='blog'>
        <h2>{blogdata.blogdata.title}</h2>
        <p>

          <a href={blogURL}>{blogdata.blogdata.url}</a><br></br>
          {blogdata.blogdata.likes} likes <button onClick={handleLikeIncrease} >Likes</button><br></br>
          {blogdata.blogdata.userId.name}<br></br>
          <button onClick={handleBlogDeletion}>Delete entry</button>
        </p>
        <h3>comments</h3>
      </div>
    )
  }


  if (blogdata.blogdata === null || !blogdata.blogdata){
    return null
  }
  else {
    if (!blogdata.blogdata.url.includes('http')){
      const blogURL = `http://${blogdata.blogdata.url}`
      return (
        <div>
          <BlogForm blogURL={blogURL}/>
          <form className='blog' onSubmit={handleSubmit}>
            <input type='text' value={comment} onChange={(e) => setComment(e.target.value) } />
            <input type='submit' value='Add Comment'></input>
          </form>
          <CommentForm />
        </div>
      )
    }
    else{
      return (
        <BlogForm blogURL={blogdata.blogdata.url}/>
      )
    }

  }

}

export default BlogDetails
import React, { useEffect, useState } from 'react'

const BlogForm = ({ createBlog }) => {

  useEffect (() => {

  })

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = async (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = async (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = async (event) => {
    setUrl(event.target.value)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    createBlog({
      'title': title,
      'author': author,
      'url': url
    })


    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <p>
      <h2>Create new Blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}/>
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}/>
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </p>
  )
}

export default BlogForm
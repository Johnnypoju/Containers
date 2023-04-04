import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




const Blog = () => {
  const selector = useSelector(state => state)


  useEffect(() => {
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    fontFamily: 'Times New Roman'
  }

  console.log(selector)
  return (
    <div>
      <table>
        <tobody>
          <th>Title</th>
          <th>Author</th>
          {selector.blogs.map( blog =>
            <tr style={blogStyle} key={blog.id}>
              {console.log(blog.id)}
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td>{blog.author}</td>
            </tr>)}
        </tobody>
      </table>
    </div>
  )

}


export default Blog
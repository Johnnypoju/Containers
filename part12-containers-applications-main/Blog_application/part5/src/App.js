import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import Blogs from './components/BlogList'
import Notification from './components/Notification'
import BlogDetails from './components/ShowBlogDetail'

import { setNotification } from './reducers/notificationReducer'
import { fetchBlogs } from './reducers/blogReducer'
import {  login, removeUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate, useMatch, Link } from 'react-router-dom'
import './index.css'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userdata, setUserdata] = useState('')
  const [blogdata, setBlogdata] = useState('')

  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const navigate = useNavigate()
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    console.log(loggedUserJSON)
    //check if user is logged in
    if (loggedUserJSON && selector.user === '') {
      console.log('user logged in')
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))

      //dispatch(fetchUsers(selector.user))
    }

    if(selector.user !== '') {
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(selector.user)
      )
      console.log(selector.user)
      dispatch(setNotification(`Welcome ${selector.user.username}`,'succeed',5000))
      if (selector.blogs.length === 0)
        dispatch(fetchBlogs(selector.user))
    }
    //Fetch blogs for current user
    if (selector.user.userList) {
      console.log(matchUser)
      setUserdata(matchUser ? selector.user.userList.find(user => user.id === matchUser.params.id) : null)
    }
    if (selector.blogs.length > 0) {
      console.log(matchBlog)
      setBlogdata(matchBlog ? selector.blogs.find(blog => blog.id === matchBlog.params.id) : null)
    }

  }, [dispatch, selector.user, matchBlog, matchUser, blogdata, selector.blogs])


  //login handling
  const handleLogin = async (event) => {
    event.preventDefault()

    //dispatch login call and empty username password variables
    try {

      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (exception) {
      dispatch(setNotification('invalid credentials', 'error', 5000))
    }

  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(removeUser())
    navigate('/')
  }


  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <p className='header'> <Link to='/blogs' className='Link'>blogs</Link>
        <Link to='/users'className='Link'>users</Link><br></br>
        {selector.user.name} has logged in. <button onClick={handleLogout}>logout</button></p>
      <h2>Blogs</h2>
    </div>
  )



  return (
    <div>
      <Notification />
      {selector.user === '' ?
        loginForm() :
        blogForm()}
      <br></br>


      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/users/:id' element={<UserDetails userdata={userdata}/>}></Route>
        <Route path='/blogs/:id' element={<BlogDetails blogdata={blogdata}/>}></Route>
      </Routes>
    </div>
  )
}

export default App
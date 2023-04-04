import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []



const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {

      return state = action.payload
    },
    removeEntry(state, action) {
      return state.filter(obj => {
        return obj.id !== action.payload
      })
    },
    increaseLikes(state, action) {
      state = state.map(obj => {
        if (obj.id === action.payload.id) {
          return { ...obj, likes: obj.likes+1 }
        }
        else{
          return obj
        }
      })

      return state
    },
    commentsUpdate(state, action) {
      const tempComment = action.payload.comment
      state = state.map(obj => {
        if (obj.id === action.payload.id) {
          return { ...obj, comments: [ ...obj.comments, tempComment ] }
        }
        else {
          return obj
        }
      })
    }
  }
})

export const { setBlogs, restReponse, increaseLikes, commentsUpdate } = blogSlice.actions

export const fetchBlogs = (user) => {

  return async dispatch => {
    const blogs = await blogService.getAll(user)
    dispatch(setBlogs(blogs))
  }
}

export const likeIncrease = ( blogObject, blogId, user ) => {
  return async dispatch => {
    const blogs = await blogService.increaseLikes(blogObject, blogId, user)
    console.log(blogs)
    dispatch(increaseLikes(blogs))
  }
}

export const removeBlogs = ( blogId, user ) => {
  return async dispatch => {
    if (window.confirm('Do you want to delete blog entry?')){
      console.log(user)
      await blogService.deleteBlog(blogId, user)
      dispatch(removeBlogs(blogId))
    }
  }
}

export const addComment = (blogdata, blogId, user) => {
  console.log(user)
  return async dispatch => {
    const comments = await blogService.addComment(blogdata, blogId, user)
    console.log(comments)
    dispatch(commentsUpdate(blogdata))
  }
}


export default blogSlice.reducer
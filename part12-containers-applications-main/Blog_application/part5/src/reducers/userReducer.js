import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = ''

const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    setUser(state,action) {
      console.log(action.payload)
      return { ...state, token: action.payload.token, username: action.payload.username, name: action.payload.name, userList: action.payload.userList }
    },
    removeUser(state,action) {
      return state = ''
    },
    getUser(state,action) {
      return state
    },
    addListOfUsers(state,action){
      return { ...state, userList: [ action.payload ] }
    }

  }

})

export const { setUser, removeUser, getUser, addListOfUsers } = userSlice.actions

export const login = (userdata) => {
  return async dispatch => {
    const response = await loginService.login(userdata)
    const userList = await loginService.getUsers(response)
    console.log(userList)
    const finalResponse = { ...response, userList }
    console.log(finalResponse)
    dispatch(setUser(finalResponse))
  }
}

export const userSet = (userdata) => {
  return async dispatch => {
    console.log('userSet')
    if (userdata !== dispatch(getUser())){
      const userList = await loginService.getUsers(userdata)
      console.log(userList)
      const finalResponse = { ...userList, userList  }
      dispatch(setUser(finalResponse))
    }
  }
}

export const fetchUsers = (userdata) => {
  return async dispatch => {
    const response = await loginService.getUsers(userdata)
    console.log(response.data)
    dispatch(addListOfUsers(response.data))
  }
}



export default userSlice.reducer
<<<<<<< HEAD
import { createSlice } from "@reduxjs/toolkit"
=======
import { createSlice } from '@reduxjs/toolkit'
>>>>>>> f5409135c48afe537fad250cf97b2301f6190022


const initialState = ''


const notificationSlice = createSlice({
<<<<<<< HEAD
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {

            return action.payload
        },
        removeNotification(state, action) {

            return action.payload

    }
}
=======
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      //console.log(action.payload)
      return action.payload
    },
    removeNotification(state, action) {

      return action.payload

    }
  }
>>>>>>> f5409135c48afe537fad250cf97b2301f6190022
})

export const { showNotification, removeNotification } = notificationSlice.actions
let timeOutID
<<<<<<< HEAD
export const setNotification = (content, timer) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        dispatch(showNotification(content))
        timeOutID = setTimeout(() => {
            dispatch(removeNotification(''))
        }, timer)

    }
<<<<<<< Updated upstream


=======
        
        
=======

export const setNotification = (content, messagetype, timer) => {
  clearTimeout(timeOutID)
  //console.log(content,messagetype,timer)
  const tempCont = {
    content: content,
    timer: timer,
    messagetype: messagetype
  }
  return async dispatch => {
    dispatch(showNotification(tempCont))
    timeOutID = setTimeout(() => {
      dispatch(removeNotification(''))
    }, timer)

  }


>>>>>>> f5409135c48afe537fad250cf97b2301f6190022
>>>>>>> Stashed changes
}

export default notificationSlice.reducer

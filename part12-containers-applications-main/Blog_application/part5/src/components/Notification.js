import { connect } from 'react-redux'
import React from 'react'


const Notification = (props) => {


  //console.log(props)
  switch(props.type){
  case 'content':
    return <div className={props.state.messagetype}>
      {props.state.content}
    </div>

  default:
    return <div></div>
  }

}

const mapStateToProps = (state) => {
  //console.log(state.notifications)
  if(state.notifications.length !== 0){

    return { state: state.notifications, type: 'content' }
  }
  else {
    return {}
  }
}


const ConnectedNotifications = connect(mapStateToProps)(Notification)

export default ConnectedNotifications





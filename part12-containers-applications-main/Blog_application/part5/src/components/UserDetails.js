import React from 'react'




const User = (userdata) => {

  console.log(userdata)

  if (userdata.userdata === null || !userdata.userdata) {
    return null
  }
  else {
    return (
      <div>
        <h2>{userdata.userdata.name}</h2>
        <b>Added blogs</b>
        {userdata.userdata.blogs.map((blog, index) =>
          <li key={index}>{blog.title}</li>)}
      </div>
    )
  }

}

export default User
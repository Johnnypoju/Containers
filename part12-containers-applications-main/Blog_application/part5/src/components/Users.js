import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {

  const selector = useSelector(state => state.user)


  if (selector.userList !== undefined) {

    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </tbody>
          <tbody>

            {selector.userList.map( obj =>
              <tr key={obj.id}>
                {console.log(obj.id)}
                <td><Link to={`/users/${obj.id}`}>{obj.name}</Link></td>
                <td> {obj.blogs.length}</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    )
  }
  else {
    <div></div>
  }


}

export default Users
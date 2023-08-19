import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const selector = useSelector(state => state.user.user)
  return (
    <div>Profile
    <p>{selector.displayName}</p>
    </div>
  )
}

export default Profile
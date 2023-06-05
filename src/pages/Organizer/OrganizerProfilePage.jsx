import React from 'react'
import Sidebar from '../../components/Organizer/sidebar/Sidebar'
import Profile from '../../components/Organizer/Profile'

function OrganizerProfilePage() {
  return (
    <div className='flex '>
      <Sidebar/>
      <Profile/>
    </div>
  )
}

export default OrganizerProfilePage

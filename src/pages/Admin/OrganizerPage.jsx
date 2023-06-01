import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import Organizers from '../../components/Admin/organizers/Organizers'

function OrganizerPage() {
  return (
    <div className='flex w-full h-screen'>
      <Sidebar/>
      <Organizers/>
    </div>
  )
}

export default OrganizerPage

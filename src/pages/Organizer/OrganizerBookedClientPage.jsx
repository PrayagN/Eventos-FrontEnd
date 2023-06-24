import React from 'react'
import Sidebar from '../../components/Organizer/sidebar/Sidebar'
import BookedClients from '../../components/Organizer/BookedClients'
function OrganizerBookedClientPage() {
  return (
    <div className='flex'>
      <Sidebar/>
      <BookedClients/>
    </div>
  )
}

export default OrganizerBookedClientPage

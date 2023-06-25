import React from 'react'
import Sidebar from '../../components/Organizer/sidebar/Sidebar'
import Chat from '../../components/Organizer/Chat'

function OrganizerChatPage() {
  return (
    <div className='flex'>
      <Sidebar/>
      <Chat/>
    </div>
  )
}

export default OrganizerChatPage

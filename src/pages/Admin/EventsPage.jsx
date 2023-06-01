import React from 'react'
import Events from '../../components/Admin/events/Events'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function EventsPage() {
  return (
    <div className='flex w-full '>
        <Sidebar/>
      <Events/>
    </div>
  )
}

export default EventsPage

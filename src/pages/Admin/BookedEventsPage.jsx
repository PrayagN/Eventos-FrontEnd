import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import BookedEvents from '../../components/Admin/events/BookedEvents'
function BookedEventsPage() {
  return (
    <div className='flex'>
      <Sidebar/>
      <BookedEvents/>
    </div>
  )
}

export default BookedEventsPage

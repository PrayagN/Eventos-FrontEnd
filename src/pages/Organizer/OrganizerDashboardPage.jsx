import React from 'react'
import Sidebar from '../../components/Organizer/sidebar/Sidebar'
import Dashboard from '../../components/Organizer/Dashboard'

function OrganizerDashboardPage() {
  return (
    <div className='flex'>
      <Sidebar/>
      <Dashboard/>
    </div>
  )
}

export default OrganizerDashboardPage

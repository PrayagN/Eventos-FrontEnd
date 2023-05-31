import React from 'react'
import Dashboard from '../../components/Admin/dashboard/dashboard'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function Dashboardpage() {
  return (
    <div className='flex w-full h-screen'>
      <Sidebar/>
      <Dashboard/>
    </div>
  )
}

export default Dashboardpage

import React from 'react'
import Dashboard from '../../components/Admin/dashboard/Dashboard'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'

function Dashboardpage() {
  return (
    <div className='flex md:flex-row'>
      <Sidebar/>
      <Dashboard/>
    </div>
  )
}

export default Dashboardpage

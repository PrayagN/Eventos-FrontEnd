import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import Dashboardpage from '../pages/Admin/Dashboardpage'
import CustomerPage from '../pages/Admin/CustomerPage'
import EventsPage from '../pages/Admin/EventsPage'
import OrganizerPage from '../pages/Admin/OrganizerPage'
import PrivateRoutes from '../middleware/PrivateRoutes'

function AdminRouter() {
  return (
       
    <Routes>
        <Route path='/' element={< AdminLoginPage/>} />
      <Route element={<PrivateRoutes role={'admin'} route={'/admin'} /> }>

        <Route path='/dashboard' element={<Dashboardpage/>} />
        <Route path='/customers' element={<CustomerPage/>} />
        <Route path='/events' element={<EventsPage/>} />
        <Route path='/organizers' element={<OrganizerPage/>}/>
      </Route>
        
    </Routes>
       
  )
}

export default AdminRouter

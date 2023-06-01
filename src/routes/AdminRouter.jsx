import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import Dashboardpage from '../pages/Admin/Dashboardpage'
import CustomerPage from '../pages/Admin/CustomerPage'
import EventsPage from '../pages/Admin/EventsPage'
import OrganizerPage from '../pages/Admin/OrganizerPage'

function AdminRouter() {
  return (
       
    <Routes>
        <Route path={'/'} element={< AdminLoginPage/>} />

        <Route path={'/dashboard'} element={<Dashboardpage/>} />
        <Route path={'/customers'} element={<CustomerPage/>} />
        <Route path={'/events'} element={<EventsPage/>} />
        <Route path={'/organizers'} element={<OrganizerPage/>}/>
        
    </Routes>
       
  )
}

export default AdminRouter

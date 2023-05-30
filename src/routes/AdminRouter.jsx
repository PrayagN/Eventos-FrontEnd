import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import Dashboardpage from '../pages/Admin/Dashboardpage'

function AdminRouter() {
  return (
    <Routes>
        <Route path={'/'} element={< AdminLoginPage/>} />
        <Route path={'/dashboard'} element={<Dashboardpage/>} />
        
    </Routes>
  )
}

export default AdminRouter

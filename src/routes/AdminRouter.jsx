import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'

function AdminRouter() {
  return (
    <Routes>
        <Route path={'/'} element={< AdminLoginPage/>} />
        
    </Routes>
  )
}

export default AdminRouter

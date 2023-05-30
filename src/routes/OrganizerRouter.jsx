import React from 'react'
import {Routes,Route} from 'react-router-dom'
import OrganizerLoginPage from '../pages/Organizer/OrganizerLoginPage'
import OrganizerSignupPage from '../pages/Organizer/OrganizerSignupPage'
import OrganizerProfilePage from '../pages/Organizer/OrganizerProfilePage'
function OrganizerRouter() {
  return (
    <Routes>
        <Route path='/' element ={< OrganizerLoginPage />} />
        <Route path='/signup' element={< OrganizerSignupPage />} />
        <Route path='/profile' element ={<OrganizerProfilePage/>} />
    </Routes>
  )
}

export default OrganizerRouter

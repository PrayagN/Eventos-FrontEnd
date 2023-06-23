import React from 'react'
import {Routes,Route} from 'react-router-dom'
import OrganizerLoginPage from '../pages/Organizer/OrganizerLoginPage'
import OrganizerSignupPage from '../pages/Organizer/OrganizerSignupPage'
import OrganizerProfilePage from '../pages/Organizer/OrganizerProfilePage'
import PrivateRoutes from '../middleware/PrivateRoutes'
import UnauthorizedRoutes  from '../middleware/UnauthorizedRoutes' 
import OrganizerDashboardPage from '../pages/Organizer/OrganizerDashboardPage'
import OrganizerBookedClientPage from '../pages/Organizer/OrganizerBookedClientPage'
function OrganizerRouter() {
  return (
    <Routes>
      <Route element={<UnauthorizedRoutes role={'organizer'} route={'/organizer/dashboard'} />}>
        <Route path='/' element ={< OrganizerLoginPage />} />
        <Route path='/signup' element={< OrganizerSignupPage />} />

      </Route>
        <Route element={<PrivateRoutes role={"organizer"} route={"/organizer"} />}>
        <Route path='/dashboard' element={<OrganizerDashboardPage/>} />
        <Route path='/profile' element ={<OrganizerProfilePage/>} />
        <Route path='/booked-clients' element={<OrganizerBookedClientPage/>} />
        </Route>

    </Routes>
  )
}

export default OrganizerRouter

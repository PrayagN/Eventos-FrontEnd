import React from 'react'
import {Routes,Route} from 'react-router-dom'
import OrganizerLoginPage from '../pages/Organizer/OrganizerLoginPage'
import OrganizerSignupPage from '../pages/Organizer/OrganizerSignupPage'
import OrganizerProfilePage from '../pages/Organizer/OrganizerProfilePage'
import PrivateRoutes from '../utils/PrivateRoutes'
import UnauthorizedRoutes  from '../utils/UnauthorizedRoutes' 
import OrganizerDashboardPage from '../pages/Organizer/OrganizerDashboardPage'
import OrganizerBookedClientPage from '../pages/Organizer/OrganizerBookedClientPage'
import OrganizerChatPage from '../pages/Organizer/OrganizerChatPage'
import Organizer404 from '../components/Error/Organizer404'
function OrganizerRouter() {
  return (
    <Routes>
      <Route element={<UnauthorizedRoutes role={'organizer'} route={'/organizer/dashboard'} />}>
        <Route path='/' element ={< OrganizerLoginPage />} />
        <Route path='/signup' element={< OrganizerSignupPage />} />

      </Route>
      <Route path='/*' element={< Organizer404 />} />
        <Route element={<PrivateRoutes role={"organizer"} route={"/organizer"} />}>
        <Route path='/dashboard' element={<OrganizerDashboardPage/>} />
        <Route path='/profile' element ={<OrganizerProfilePage/>} />
        <Route path='/booked-clients' element={<OrganizerBookedClientPage/>} />
        <Route path='/chats' element={<OrganizerChatPage/>}/>
        </Route>

    </Routes>
  )
}

export default OrganizerRouter

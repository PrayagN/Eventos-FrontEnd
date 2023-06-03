import React from 'react'
import {Routes,Route} from 'react-router-dom'
import OrganizerLoginPage from '../pages/Organizer/OrganizerLoginPage'
import OrganizerSignupPage from '../pages/Organizer/OrganizerSignupPage'
import OrganizerProfilePage from '../pages/Organizer/OrganizerProfilePage'
import PrivateRoutes from '../middleware/PrivateRoutes'
function OrganizerRouter() {
  return (
    <Routes>
        <Route path='/' element ={< OrganizerLoginPage />} />
        <Route path='/signup' element={< OrganizerSignupPage />} />
        {/* <Route element={<PrivateRoutes role={"organizer"} route={"/organizer"} />}> */}

        <Route path='/profile' element ={<OrganizerProfilePage/>} />
        {/* </Route> */}
    </Routes>
  )
}

export default OrganizerRouter

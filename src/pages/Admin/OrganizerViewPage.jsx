import React from 'react'
import OrganizerView from '../../components/Admin/organizers/OrganizerView'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'
function OrganizerViewPage() {
    return (
    <div className='flex'>
      
        <Sidebar/>
      <OrganizerView  />

    </div>
  )
}

export default OrganizerViewPage

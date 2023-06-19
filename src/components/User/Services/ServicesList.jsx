import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { eventOrganizers } from '../../../Services/userApi'
function ServicesList() {
  const location = useLocation()
  const event_id = location?.state.id
  useEffect(()=>{
    eventOrganizers(event_id).then((response)=>{
      console.log(response.data.organizers);
    })
  })
  return (
    <div className='w-full items-center'>
      
    </div>
  )
}

export default ServicesList

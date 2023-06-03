import React from 'react'
import img2 from '../../assets/gallery/img2.jpg'
import  Card  from '../Admin/organizers/Card'
import Posts from './Posts'
function Profile() {
  return (
    <div >
      <div className='m-12'>

      <h1 className=" text-4xl font-semibold font-arim">Profile</h1>
      
      <Card title='Eventina' size='true'/>
      </div>
      <div className='px-12'>

      <Posts/>
      </div>
    
    </div>
  )
}

export default Profile

import React from 'react'
import Navbar from '../../components/User/Home/Navbar'

import Footer from '../../components/User/Home/Footer'
import Header from '../../components/User/Header/Header'
import Organizer from '../../components/User/Organizer/Organizer'
function OrganizerPage() {
  return (
    <div>
    <Navbar/>
    <div className='mt-20'>
    <Header title='Organizers'/>
      <Organizer/>

    </div>
      <Footer/>
    </div>
  )
}

export default OrganizerPage

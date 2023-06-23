import React from 'react'
import Navbar from '../../components/User/Home/Navbar'

import Footer from '../../components/User/Home/Footer'
import Header from '../../components/User/Header/Header'
import Organizer from '../../components/User/Organizer/Organizer'
function OrganizerPage() {
  return (
    <div>
    <Navbar/>
    <Header title='Organizers'/>
    <div className='mt-20'>
      <Organizer/>

    </div>
      <Footer/>
    </div>
  )
}

export default OrganizerPage

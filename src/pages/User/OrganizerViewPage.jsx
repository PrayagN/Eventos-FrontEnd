import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import OrganizerView from '../../components/User/Organizer/OrganizerView'
import Footer from '../../components/User/Home/Footer'
import Header from '../../components/User/Header/Header'
function OrganizerViewPage() {
  return (
    <div>
      <Navbar/>
      <div className=''>
      <Header title={'What we Do'}/>

      <OrganizerView/>
      </div>
      <Footer/>
    </div>
  )
}

export default OrganizerViewPage

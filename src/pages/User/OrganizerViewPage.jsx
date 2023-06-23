import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import OrganizerView from '../../components/User/Organizer/OrganizerView'
import Footer from '../../components/User/Home/Footer'
import Header from '../../components/User/Header/Header'
function OrganizerViewPage() {
  return (
    <div>
      <Navbar/>
      <Header title={'What we Do'}/>
      <div className='mt-20'>

      <OrganizerView/>
      </div>
      <Footer/>
    </div>
  )
}

export default OrganizerViewPage

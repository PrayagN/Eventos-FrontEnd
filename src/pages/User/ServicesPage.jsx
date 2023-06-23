import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import Services from '../../components/User/Services/Services'
import Footer from '../../components/User/Home/Footer'

function ServicesPage() {
  return (
    <div>
      <Navbar/>
      <div className='mt-20'>

      <Services/>
      </div>
      <Footer/>
    </div>
  )
}

export default ServicesPage

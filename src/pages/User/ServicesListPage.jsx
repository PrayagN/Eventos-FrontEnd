import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import ServicesList from '../../components/User/Services/ServicesList'
import Footer from '../../components/User/Home/Footer'

function ServicesListPage() {
  return (
    <div>
      <Navbar/>
      <ServicesList/>
      <Footer/>
    </div>
  )
}

export default ServicesListPage

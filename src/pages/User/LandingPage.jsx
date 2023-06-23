import React from 'react'
import Home from '../../components/User/Home/Home'
import Navbar from '../../components/User/Home/Navbar'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <div className='mt-20'>

      <Home />
      </div>
    </div>
  )
}

export default LandingPage

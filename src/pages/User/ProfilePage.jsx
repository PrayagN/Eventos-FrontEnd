import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import Profile from '../../components/User/Profile/Profile'
import Footer from '../../components/User/Home/Footer'
import Header from '../../components/User/Header/Header'
function ProfilePage() {
  return (
    <div>
      <Navbar/>
      <Header title='Profile'/>
      <div className='mt-20'>
      <Profile/>

      </div>
      <Footer/>
    </div>
  )
}

export default ProfilePage

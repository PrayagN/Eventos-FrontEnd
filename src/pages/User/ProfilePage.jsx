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
      <Profile/>
      <Footer/>
    </div>
  )
}

export default ProfilePage

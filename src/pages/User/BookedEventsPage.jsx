import React from 'react'
import Navbar from '../../components/User/Home/Navbar'
import Header from '../../components/User/Header/Header'
import Footer from '../../components/User/Home/Footer'
import BookedEvents from '../../components/User/Profile/BookedEvents'
function BookedEventsPage() {
  return (
    <div>
      <Navbar/>
      <div className=''>
      <Header title={'Booked Events'}/>

      <BookedEvents/>
      </div>
      <Footer/>
    </div>
  )
}

export default BookedEventsPage

import React from 'react'
import Header from '../Header/Header'
import Gallery from '../Home/Gallery'
import img1 from '../../../assets/gallery/img1.jpg'
function Services() {
  return (
    <div>
      <Header title='Services' />
      <div className='grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3  mt-12 pt-1 mx-10 gap-10'>

      <Gallery Image={img1} title='wedding'  />
      </div>
    </div>
  )
}

export default Services

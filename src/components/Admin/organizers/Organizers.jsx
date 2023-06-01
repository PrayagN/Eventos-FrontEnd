import React from 'react'
import Gallery from '../../User/Home/Gallery'
import img1   from '../../../assets/gallery/img1.jpg'
function Organizers() {
  return (
    <div className='w-full'>
     <div className="flex justify-end ">
        <div className="rounded-full w-12  m-2 ">
          <img
            className="rounded-full"
            src="https://i0.wp.com/hoyenapple.com/wp-content/uploads/2022/10/como-crear-o-editar-un-memoji.jpg?fit=2000%2C1200&ssl=1"
            alt=""
          />
        </div>
      </div>
        <h1 className="m-12 text-4xl font-semibold font-arim">Organizers</h1>
        <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        <Gallery Image={img1} title="Wedding" />
        <Gallery Image={img1} title="Wedding" />
        <Gallery Image={img1} title="Wedding" />
      </div>
    </div>
  )
}

export default Organizers

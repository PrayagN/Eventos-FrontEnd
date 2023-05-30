import React from 'react'
function Gallery({Image:Image,title:title}) {
  return (
    <div className="transition duration-300 transform hover:scale-110">
          <div className="">
          <img className='rounded-xl' src={Image} alt="" />

            <h1 className="  font-bold font-serif pl-36 pt-2 ">{title}</h1>
          </div>
          
          
        </div>
  )
}

export default Gallery

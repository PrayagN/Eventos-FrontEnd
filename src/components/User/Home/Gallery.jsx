import React from 'react'

function Gallery({Image:Image,title:title}) {
  return (
    <div className="">
          <div className=" ">
          <img src={Image} alt="" />

            <h1 className="  font-bold font-serif ">{title}</h1>
          </div>
          
          
        </div>
  )
}

export default Gallery

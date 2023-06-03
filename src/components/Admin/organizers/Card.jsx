import React from 'react'
import img1 from '../../../assets/gallery/img1.jpg'
function Card({title:title,description:description,size:size}) {
  return (
    <div>
   
<div className={`max-w-sm   rounded-lg shadow shadow-gray-600 ${size && 'ml-24 mt-6  w-48 '} `}>
    
        <img className={`rounded-lg w-36    ${size ? 'w-10  pt-4 pl-2 mx-8 pr-4 ' : 'ml-24'} pt-3 `} src={img1} alt="" />

    <div className={`${size ?'p-2 ' :'p-5'}`}>
      
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black justify-center flex ">{title}</h5>
     
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
       
    </div>
</div>


    </div>
  )
}

export default Card

import React from 'react'

function ServiceCard({icon:Icon,title,content}) {
  return (
      <div className=" ">
          <div className="flex ">
          <Icon className="text-blue-600"/>

            <h1 className="pl-4 text-gray-500 font-bold font-sans ">{title}</h1>
          </div>
          <p>{content}</p>
          
        </div>
  )
}

export default ServiceCard

import React from 'react'
function Header({title}) {
  return (
    <div className="relative   ">
    <img
      className="w-full h-80 opacity-60"
      src="/headerbanner.jpg"
      alt=""
    />
    <div className="absolute inset-0 bg-black bg-opacity-80"></div>
    
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h2 className="text-white text-4xl  sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl font-bold transform scale-90">
        {title}
      </h2>
      {/* <p className="text-white">Additional information</p>  */}
    </div>
  </div>
  )
}

export default Header

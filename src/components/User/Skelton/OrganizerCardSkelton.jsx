import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from 'react'

function OrganizerCardSkelton() {
  return (
    <>
       <SkeletonTheme   baseColor='gray' highlightColor='#e0dddda9'>
      <div style={{maxWidth:'100%'}} className=" h-64 bg-[#e0dddda9] rounded rounded-b-xl xl:w-60 mx-3 my-3 sm:my-0 pb-2 transition duration-300 transform hover:scale-110">
        <div className="flex  justify-center mt-5">

        <Skeleton height={100} width={200} className="flex-shrink-0" />
        </div>
        <div className="flex justify-center ">

        </div>
        <div className="mx-3 mt-5 ">
          <h1>
            <Skeleton   height={15}/>
          </h1>
          <h1>
            <Skeleton   height={15}/>
          </h1>
          <h1>
            <Skeleton   height={15 }/>
          </h1>
        </div>
       
       

      </div>
    </SkeletonTheme>
    </>
  )
}

export default OrganizerCardSkelton

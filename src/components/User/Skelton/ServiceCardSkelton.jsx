import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from 'react'

function ServiceCardSkelton() {
  return (
    <>
       <SkeletonTheme baseColor="#D3D3D3" highlightColor="#e0dddda9">
       <div className="">

       <Skeleton
            height={300}
            width="100%"
            className="flex-shrink-0"
            style={{
              maxWidth: "100%",
            }}
          />           
          </div>
          </SkeletonTheme>
    </>
  )
}

export default ServiceCardSkelton

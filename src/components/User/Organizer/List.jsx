import React from "react";
import img1 from "../../../assets/gallery/img1.jpg";

function List({title,description,img}) {
  return (
    <div className="flex ">
      <div
        className={`max-w-sm rounded-lg shadow shadow-gray-600 w-72
        }`}
      >
        
        <div  className="flex justify-center">

        <img
          className={`rounded-lg w-28  pt-3`}
          src={img}
          alt=""
          />
          </div>

        <div className={` p-5`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black justify-center flex">
            {title}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 justify-center flex">
            {description}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default List;

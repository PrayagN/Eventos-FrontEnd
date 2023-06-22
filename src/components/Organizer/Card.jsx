import React from "react";
import { FcCameraAddon } from "react-icons/fc";
import {validateImage} from '../../constants/constants'
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
function Card({
  title,
  size,
  description,
  event,
  organizer,
  id,
  logo,
  imagePreview,
  setLogo
}) {
  // const [isOpen, setIsOpen] = useState(false);
  
  return (
    // <div
    //   className={`flex cursor-pointer ${id ? "clickable" : ""}`}
    //   onClick={() => setIsOpen(true)}
    // >
      <div
        className={`max-w-sm rounded-lg shadow shadow-gray-600 ${
          size
            ? "ml-4 md:ml-24 mt-6 md:mt-0 w-48 md:justify-center"
            : "mx-auto md:mx-0"
        }`}
      >
        <div className="flex justify-center rounded-lg object-cover">
          {!organizer ? (
            imagePreview ? (
              <img
                className={` ${
                  size
                    ? "w-16 md:w-36 pt-4 pl-2 mx-1 md:mx-8 pr-4 sm:justify-center"
                    : "w-36"
                } pt-3`}
                src={URL.createObjectURL(imagePreview)}
                alt=""
              />
            ) : (
              <img
                className={` ${
                  size
                    ? "w-16 md:w-36 pt-4 pl-2 mx-1 md:mx-8 pr-4 sm:justify-center"
                    : "w-36"
                } pt-3`}
                src={logo}
                alt=""
              />
            )
          ) : (
            <img
              className={` flex justify-center  w-44 py-3`}
              src={URL.createObjectURL(logo)}
              alt=""
            />
          )}
        </div>
        <label className="absolute  text-white px-52   ">
          <FcCameraAddon className="w-32 cursor-pointer" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e)=>{setLogo(validateImage(e.target.files[0])),setOrgLogo(null)}}
          />
        </label>

        <div className={`${size ? "p-2" : "p-5"}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black justify-center flex ">
            {title}
          </h5>

          {event ? (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 justify-center flex">
              - {event}
            </p>
          ) : (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 justify-center flex">
              {description}
            </p>
          )}
        </div>
      
      </div>
    
    // </div>
  );
}

export default Card;

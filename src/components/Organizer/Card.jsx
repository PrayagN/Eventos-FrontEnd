import React from "react";
import { FcCameraAddon } from "react-icons/fc";
import { validateImage } from "../../constants/constants";
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
  setLogo,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(validateImage(file));
    }
  };

  return (
    <div className={`max-w-sm rounded-lg shadow shadow-gray-600  ${size ? "ml-4 md:ml-24 mt-6 md:mt-0 w-auto md:justify-center" : "mx-auto md:mx-0"}`}>
      <div className="flex justify-center rounded-lg object-cover flex-wrap relative">
        {!organizer ? (
          imagePreview ? (
            <img className={` ${size ? "w-16 md:w-36 pt-4 pl-2 mx-1 md:mx-8 pr-4 sm:justify-center" : "w-36"} pt-3`} src={URL.createObjectURL(imagePreview)} alt="" />
          ) : (
            <img className={` ${size ? " w-32" : "w-36"} pt-3`} src={logo} alt="" />
          )
        ) : (
          <img className={` flex justify-center  w-44 py-3`} src={URL.createObjectURL(logo)} alt="" />
        )}
        <div>
          {/* Content goes here */}
        </div>
        <div>
          {/* Content goes here */}
        </div>
      </div>
      <div className={`${size ? "p-2 relative " : "p-5"} `}>
        <div>


        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black justify-center flex">
          {title}
        </h5>
          </div>
      <div className="flex absolute text-white">
        <label htmlFor={`logoInput-${id}`} className="cursor-pointer">
          <FcCameraAddon size={26} />
        </label>
        <input
          type="file"
          id={`logoInput-${id}`}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          />
      </div>
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
  );
}

export default Card;

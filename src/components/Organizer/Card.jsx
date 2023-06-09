import React from "react";

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
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(logo);
  return (
    <div
      className={`flex cursor-pointer ${id ? "clickable" : ""}`}
      onClick={() => setIsOpen(true)}
    >
      <div
        className={`max-w-sm rounded-lg shadow shadow-gray-600 ${
          size
            ? "ml-4 md:ml-24 mt-6 md:mt-0 w-48 md:justify-center"
            : "mx-auto md:mx-0"
        }`}
      >
        <div className="flex justify-center rounded-lg">
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
      {/* {isOpen && (
             <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">

              </div>
          )

          } */}
    </div>
  );
}

export default Card;

import React from "react";
import img1 from "../../../assets/gallery/img1.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, size, description, event, organizer, id, img }) {
const navigate =useNavigate()
  const handleButton=()=>{
    navigate('/admin/organizers/view',{state:{id}})
  }
  return (
    <div
      className={`flex cursor-pointer`}
   
    >
      <div
        className={`max-w-sm rounded-lg shadow shadow-gray-600 card-container ${
          size
            ? "ml-4 md:ml-24 mt-6 md:mt-0 w-48 md:justify-center"
            : "mx-auto md:mx-0"
        }`}
      >
        <div className="flex justify-center rounded-lg">
          <div
            className={`${
              size
                ? "w-16 md:w-24 pt-4 mx-1 md:mx-4 pr-2 sm:justify-center"
                : "w-36"
            } pt-3`}
            style={{ width: size ? "4rem" : "6rem" }}
          >
            {!organizer ? (
              <img className="w-full h-full object-contain" src={img} alt="" />
            ) : (
              <img
                className="w-full h-16 object-cover rounded-2xl"
                src={img}
                alt=""
              />
            )}
          </div>
        </div>

        <div className={`${size ? "p-2" : "p-5"} flex flex-col items-center`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {title}
          </h5>

          {event ? (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              - {event}
            </p>
          ) : (

          <div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-5">
              {description}
            </p>
          </div>

         )}
        </div>
        <div className="flex justify-center w-full h-8 mb-4">
          {/* <button className="">View</button> */}
          <button onClick={handleButton}
            
            className="relative inline-flex items-center justify-center  px-6  overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              View
            </span>
            <span className="relative invisible">View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

import React from "react";
import { useNavigate } from "react-router-dom";
function List({ title, description, img,id,organizer }) {
  const navigate = useNavigate()

  const handleButton=()=>{
    if(organizer){
      navigate('/organizers/view',{state:{id}})
    }else{
      navigate(`/services/view`,{state:{id}})
    }
    
  }

  return (
    <div className="flex">
      <div
        className={`max-w-sm rounded-lg shadow shadow-gray-600 w-72 relative`}
      >
        <div className="flex justify-center">
          <img className={`rounded-lg w-28 pt-3`} src={img} alt="" />
        </div>
        <div className={`p-5 h-64 mb-5`} style={{ minHeight: "7rem" }}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black justify-center flex">
            {title}
          </h5>
          <p
            className="font-normal text-gray-700 dark:text-gray-400 justify-center flex overflow-hidden "
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
            }}
            title={description}
          >
            {description}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center  ">
          <button onClick={handleButton} className="w-32 h-10 relative inline-flex items-center justify-center p-4 px-6 py-3 bg-blue-500 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-blue-500 rounded shadow-md group  mb-4">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
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
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              View
            </span>
            <span className="relative invisible">View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;

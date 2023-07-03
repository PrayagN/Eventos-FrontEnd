import React from "react";
import { useNavigate } from "react-router-dom";
function Gallery({ Image: Image, title: title, id: id }) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/services/${title}`,{state:{id}})
    
  };
  return (
    <div className="transition duration-300 transform hover:scale-110 cursor-pointer">
      {id ? (
        <div className="" onClick={handleClick}>
          <img className="rounded-xl" src={Image} alt="" />
          <div className="flex justify-center">

          <h1 className="  font-bold mt-3">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="">
          <img className="rounded-xl" src={Image} alt="" />

          <h1 className="  font-bold font-serif pl-36 pt-2 ">{title}</h1> 
        </div>
      )}
    </div>
  );
}

export default Gallery;

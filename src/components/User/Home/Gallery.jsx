import React from "react";
import { photosAPI } from "../../../Services/photosApi";
function Gallery({ Image:Image, title: title, id:id }) {
  const handleClick = () => {
    if (onClick) {
      onClick(id); // Passes the id to the onClick event handler
    }
  };
  return (
    <div className="transition duration-300 transform hover:scale-110">
      {id ? (
        <div className="">
          <img
            className="rounded-xl"
            src={Image}
            alt=""
            onClick={handleClick}
          />

          <h1
            className="  font-bold font-serif pl-36 pt-2 "
            onClick={handleClick}
          >
            {title}
          </h1>
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

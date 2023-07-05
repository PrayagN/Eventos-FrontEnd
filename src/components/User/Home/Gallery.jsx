import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

function Gallery({ Image, title, id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${title}`, { state: { id } });
  };

  useEffect(() => {
    const imageElement = new window.Image();
    imageElement.onload = () => {
      setIsLoading(false);
      setImageHeight(imageElement.height);
    };
    imageElement.src = Image;
  }, [Image]);

  return (
    <div className="transition duration-300 transform hover:scale-110 cursor-pointer">
      {id ? (
        <div className="" onClick={handleClick}>
          {isLoading ? (
            <Skeleton height={imageHeight} />
          ) : (
            <img
              className="rounded-xl"
              src={Image}
              alt=""
              onLoad={() => {}}
            />
          )}
          <div className="flex justify-center">
            <h1 className="font-bold mt-3">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="">
          {isLoading ? (
            <Skeleton height={imageHeight} />
          ) : (
            <img
              className="rounded-xl"
              src={Image}
              alt=""
              onLoad={() => {}}
            />
          )}
          <h1 className="font-bold font-serif pl-36 pt-2">{title}</h1>
        </div>
      )}
    </div>
  );
}

export default Gallery;

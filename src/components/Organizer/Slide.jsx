import React, { useEffect, useState } from "react";
import { BiChevronsLeft, BiChevronRight, BiChevronLeft } from "react-icons/bi";

function Slide({ children: photos,autoSlide=false,autoSlideInterval=3000, }) {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? photos.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === photos.length - 1 ? 0 : curr + 1));

    useEffect(()=>{
      if(!autoSlide) return
      const slideInterval = setInterval(next,autoSlideInterval)
      return ()=> clearInterval(slideInterval)
    },[])
  };
  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {photos}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white
     text-gray-800 hover:bg-white"
        >
          <BiChevronLeft />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white
     text-gray-800 hover:bg-white"
        >
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Slide;

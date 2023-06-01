import React from "react";
import Gallery from "../../User/Home/Gallery";
import img5 from "../../../assets/gallery/img5.webp";
import { Link } from "react-router-dom";
function Events() {
  return (
    <div className="w-full  ">
      <div className="flex justify-end ">
        <div className="rounded-full w-12  m-2 ">
          <img
            className="rounded-full"
            src="https://i0.wp.com/hoyenapple.com/wp-content/uploads/2022/10/como-crear-o-editar-un-memoji.jpg?fit=2000%2C1200&ssl=1"
            alt=""
          />
        </div>
      </div>
      <h1 className="m-12 text-4xl font-semibold font-arim">Events</h1>
       {/* <Link>  */}
      <Link to='/admin/events/addevents' className="flex justify-end mx-6 gap-3 ">
       <button  className="rounded p-2  bg-blue-500  text-white">
          Add Events
        </button>
      </Link>
       {/* </Link>  */}

      {/* <div className="shadow-lg shadow-gray-600 h-auto  rounded-lg mx-6"> */}
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        <Gallery Image={img5} title="Wedding" />
        <Gallery Image={img5} title="Wedding" />
        <Gallery Image={img5} title="Wedding" />
        <Gallery Image={img5} title="Wedding" />
      </div>
    </div>
    // </div>
  );
}

export default Events;

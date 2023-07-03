import React from "react";
import Header from "../Header/Header";
import Gallery from "../Home/Gallery";
import { eventList } from "../../../Services/userApi";
import { useEffect, useState } from "react";
import { photosAPI } from "../../../Services/photosApi";
import ScrollButton from "../ScrollButton/ScrollButton";
function Services() {
  const [eventlist, setEventList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await eventList().then((response) => {
          setEventList(response.data.events);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Header title="Services" />
        <div className="flex md:justify-end justify-center mt-5 ">
          <div
            className="relative mb-3 shadow-lg shadow-gray-600 rounded-xl mr-5"
            data-te-input-wrapper-init
          >
            <input
              type="text"
              className="peer rounded-xl min-h-[auto] w-full outline-none px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length === 0 && (
              <label className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary">
                Search
              </label>
            )}
          </div>
        </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-12 pt-1 mx-10 gap-10  ">
        {eventlist.map((event, index) => (
          <Gallery
            key={index}
            Image={`${photosAPI}eventsPhotos/${event.image}`}
            title={event.title}
            id={event._id}
          />
        ))}
      </div>
      <ScrollButton/>
    </div>
  );
}

export default Services;

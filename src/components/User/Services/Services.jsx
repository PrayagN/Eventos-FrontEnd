import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Gallery from "../Home/Gallery";
import { eventList } from "../../../Services/userApi";
import ScrollButton from "../ScrollButton/ScrollButton";
import ServiceCardSkelton from "../Skelton/ServiceCardSkelton";


function Services() {
  const [eventListData, setEventListData] = useState([]);
  const [originalEventList, setOriginalEventList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await eventList();
        if(response){

          setEventListData(response.data.events);
          setOriginalEventList(response.data.events);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setEventListData(originalEventList);
    } else {
      const filteredData = originalEventList.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setEventListData(filteredData);
    }
  };

  return (
    <div className="">
      <Header title="Services" />
      <div className="flex md:justify-end justify-center mt-5">
        <div className="relative mb-3 shadow-lg shadow-gray-600 rounded-xl mr-5">
          <input
            type="text"
            className="peer rounded-xl min-h-[auto] w-full outline-none px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery.length === 0 && (
            <label className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary">
              Search
            </label>
          )}
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-12 pt-1 mx-10 gap-10">
        {!isLoading ? (
          eventListData.map((event, index) => (
            <Gallery
              key={index}
              Image={`${import.meta.env.VITE_UserBaseUrl}eventsPhotos/${
                event.image
              }`}
              title={event.title}
              id={event._id}
            />
          ))
        ) : (
          <ServiceCardSkelton/>
        )}
      </div>
      <ScrollButton />
    </div>
  );
}

export default Services;

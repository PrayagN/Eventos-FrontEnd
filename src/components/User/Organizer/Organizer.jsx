import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { organizerList } from "../../../Services/userApi";
import List from "./List";
import Pagination from "../Pagination/Pagination";
import ScrollButton from "../ScrollButton/ScrollButton";
import OrganizerCardSkelton from "../Skelton/OrganizerCardSkelton";
const Organizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalOrganizers, setTotalOrganizers] = useState(0);
  const [review, setReview] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [openDrop, setOpenDrop] = useState(false);
  const [rating, setRating] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const organizerLimitPerPage = 2;
  useEffect(() => {
    organizerList(
      activePage,
      organizerLimitPerPage,
      searchQuery,
      selectedEvent,
      selectedDistrict
    ).then((response) => {
      setOrganizers(response?.data.organizers);
      setEvents(response.data.events);
      setTotalOrganizers(response.data.total);
      setRating(response.data.rating);
      setDistrict(response.data.district);
      setIsLoading(false);
    });
  }, [activePage, searchQuery, selectedEvent, selectedDistrict]);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
  };
  const handleDropdownToggle = () => {
    setOpenDrop(!openDrop);
  };

  // console.log(organizers[0].district);
  return (
    <div className="w-fll items-center ">
      <div className="max-h-96 max-[1250px]:">
        <h2 className="text-center text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl mt-24 text-gray-500">
          The <span style={{ color: "#1976d2" }}>Event Management</span>{" "}
          Specialists
        </h2>
        <Typography
          align="center"
          fontSize={"20px"}
          marginLeft={"0px"}
          marginTop={"30px"}
          className="text-sm sm:text-3xl md:text-2xl lg:text-4xl xl:text-5xl font-bold transform scale-90"
        >
          From Wedding Functions to Birthday Parties or Corporate Events to
          Musical Functions,
          <br />
          We offer a full range of Events Management Services that scale to your
          needs & budget.
        </Typography>
      </div>
      <br />

      <div className="flex flex-col lg:flex-col-3 items-center justify-center md:flex-row md:justify-start md:items-center">
        <div className="flex justify-center flex-grow ml-5 md:ml-24  mb-4 md:mb-0 md:mr-4 ">
          <div
            className=" overflow-x-auto  h-14 pr-5  flex gap-4 justify-start items-center scrollbar-hide border-b-2 border-blue-500"
            style={{ width: "300px", scrollLeft: 0 }}
          >
            <button
              className={` py-1 ml-2 px-4 rounded-lg ${
                selectedEvent === "All" ? "bg-blue-500 text-white" : ""
              } hover:scale-110 duration-100`}
              onClick={() => handleEventClick("All")}
            >
              All
            </button>
            {events.map((event, index) => (
              <button
                key={index}
                className={` py-1 px-2  rounded-lg ${
                  selectedEvent === event.title ? "bg-blue-500 text-white" : ""
                } hover:scale-110 duration-100`}
                onClick={() => handleEventClick(event.title)}
                style={{ whiteSpace: "nowrap" }}
              >
                {event.title}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 ">
          <button
            onClick={handleDropdownToggle}
            className=" text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            District
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openDrop && (
            <div className="absolute z-10 my-2 bg-white divide-y divide-gray-100 rounded-lg shadow ">
              <ul className="py-2 text-sm text-gray-700 ">
                {district.map((district, index) => (
                  <div className="py-1 hover:bg-gray-100 rounded" key={index}>
                    <li
                      onClick={() => setSelectedDistrict(district)}
                      className="cursor-pointer px-5 "
                    >
                      {district}
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className="relative mb-3 shadow-lg shadow-gray-600 rounded-xl mr-5"
          data-te-input-wrapper-init
        >
          <input
            type="text"
            className="peer rounded-xl min-h-[auto] w-full outline-none  py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery.length === 0 && (
            <label className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary">
              Search
            </label>
          )}
        </div>
      </div>

      <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-5 mt-5">
      {!isLoading ? (
    organizers.map((organizer, index) => (
      <List
        key={index}
        description={organizer.description}
        title={organizer.organizerName}
        organizer={true}
        img={organizer.logo}
        id={organizer._id}
        review={
          rating.find((item) => item._id === organizer._id)?.reviewCount || 0
        }
        budget={organizer.budget}
        rating={
          rating.find((item) => item._id === organizer._id)?.ratings || 0
        }
      />
    ))
    ) : (
      <>
      {/* // <div className="flex flex-wrap gap-5 mx-5"> */}
    <OrganizerCardSkelton/>
    <OrganizerCardSkelton/>
      </>

  // </div>
) 
// : 

// (
  //   <div className="flex justify-center w-full h-80">
  //     <img src="/src/assets/gallery/no_result.gif" alt="No Result" />
  //   </div>
  // )
}
  </div>


      <div className="flex justify-center mt-10">
        <Pagination
          activePage={activePage}
          limit={organizerLimitPerPage}
          setActivePage={setActivePage}
          totalOrganizers={totalOrganizers}
        />
      </div>
      <ScrollButton />
    </div>
  );
};

export default Organizer;

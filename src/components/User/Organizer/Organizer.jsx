import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { organizerList } from "../../../Services/userApi";
import List from "./List";

const Organizer = () => {
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrganizers, setFilteredOrganizers] = useState([]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filteredOrganizers = organizers.filter((organizer) => {
      const organizerNameMatch = organizer.organizerName

        .toLowerCase()
        .includes(value.toLowerCase());
      const organizerDistrict = organizer.district
        .toLowerCase()
        .includes(value.toLowerCase());
      const eventMatch =
        selectedEvent === "All" || organizer.event === selectedEvent;
      return organizerNameMatch && eventMatch;
    });

    setFilteredOrganizers(filteredOrganizers);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await organizerList();
      console.log(response.data.organizers);
      setOrganizers(response.data.organizers);
      setEvents(response.data.events);
    };
    fetch();
  }, []);

  useEffect(() => {
    const filteredOrganizers = organizers.filter((organizer) => {
      if (selectedEvent === "All") {
        return true;
      }
      return organizer.event === selectedEvent;
    });
    setFilteredOrganizers(filteredOrganizers);
  }, [organizers, selectedEvent]);

  return (
    <div className="w-fll items-center">
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

      <div className="flex flex-col items-center justify-center md:flex-row md:justify-start md:items-center">
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

        <div
          className="relative mb-3 shadow-lg shadow-gray-600 rounded-xl mr-5"
          data-te-input-wrapper-init
        >
          <input
            type="text"
            className="peer rounded-xl min-h-[auto] w-full outline-none px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery.length === 0 && (
            <label
              
              className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary"
            >
              Search
            </label>
          )}
        </div>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-3  mt-12 pt-1 ml-32 gap-5  ">
        {filteredOrganizers.length > 0 ? (
          filteredOrganizers.map((organizer, index) => (
            <List
              key={index}
              description={organizer.description}
              title={organizer.organizerName}
              organizer={true}
              img={organizer.logo}
              id={organizer._id}
            />
          ))
        ) : (
          <div className="grid-cols-none">
            There is no such organizer available
          </div>
        )}
      </div>
    </div>
  );
};

export default Organizer;

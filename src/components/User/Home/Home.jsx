import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExtensionOutlineIcon from "@mui/icons-material/ExtensionOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import ServiceCard from "./ServiceCard";
import Gallery from "./Gallery";
import {photosAPI} from '../../../Services/photosApi'
import RotatingSquare from "../../RotatingSquare";
import Sponsors from "./Sponsers";
import Footer from "./Footer";
import ScrollButton from "../ScrollButton/ScrollButton";
import { eventList } from "../../../Services/userApi";

function Home() {

  const [events,setEvents] = useState([])
  useEffect(()=>{
    eventList().then((response)=>{
      setEvents(response.data.events)
    })
  })
 
  return (
    <div className="w-full h-screen  items-center  z-[1]  ">
      <div className="relative ">
        <img
          className="w-full opacity-60"
          src="https://demo.ovatheme.com/dvents/wp-content/uploads/2017/06/bg-1-1.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-white text-xs  sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl font-bold transform scale-90">
            CELEBRATE YOUR EVENTS THAT LAST LONGER
          </h2>
          {/* <p className="text-white">Additional information</p>  */}
        </div>
      </div>
      <div className="relative mt-10 ">
        <RotatingSquare />
      </div>
      <div className="max-h-96 max-[1250px]: ">
        <h2 className="text-center  text-3xl  sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl mt-24  text-gray-500">
          Welcome to <span style={{ color: "#1976d2" }}>Eventos</span>{" "}
        </h2>
        <Typography
          align="center"
          fontSize={"20px"}
          marginLeft={"0px"}
          marginTop={"30px"}
          className="text-sm  sm:text-3xl  md:text-2xl lg:text-4xl xl:text-5xl font-bold transform scale-90"
        >
          From Wedding Functions to Birthday Parties or Corporate Events to
          Musical Functions,
          <br />
          We offer full range of Events Management Services that scale to your
          needs & budget.
        </Typography>
      </div>
      <div className="mx-20">
        <div className=" mt-12 ml-6  grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <ServiceCard
            icon={ExtensionOutlineIcon}
            title="Great Services"
            content="These organizers excel in their ability to understand their clients' vision and translate it into a memorable event experience, seamlessly incorporating elements such as themes, decor, entertainment, and catering"
          />
          <ServiceCard
            icon={PeopleOutlineIcon}
            title="Great People"
            content="Great people in event management organizers possess a natural talent for building strong relationships with clients, vendors, and team members, fostering a collaborative and supportive environment"
          />
          <ServiceCard
            icon={PieChartOutlineIcon}
            title="Great Ideas"
            content="
            Great ideas from event management organizers breathe life into events, infusing them with creativity, uniqueness, and a memorable experience that leaves a lasting impact on attendees"
          />
        </div>
      </div>
      <div className="bg-slate-50 mt-12 pt-1">
        <h2 className="text-center   mt-24  text-gray-500 text-3xl  sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl">
          <span style={{ color: "#1976d2" }}>Eventos</span> Services
        </h2>
        <Typography
          align="center"
          fontSize={"20px"}
          marginLeft={"0px"}
          marginTop={"30px"}
          className="sm:text-sm  md:text-2xl lg:text-3xl xl:text-5xl font-bold transform scale-90"
        >
          We make your events smart & impactful by personalised event management
          services
        </Typography>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-12 pt-1 mx-10 gap-10">
        {events.map((event, index) => (
          <Gallery
            key={index}
            Image={`${photosAPI}eventsPhotos/${event.image}`}
            title={event.title}
            id={event._id}
          />
        ))}
      </div>
      <div className="mx ">
        <img
          className=" max-h-64 w-full pt-5"
          src="https://demo.ovatheme.com/dvents/wp-content/uploads/2017/06/1-2.jpg?id=81"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center mt-12">
        <div
          className="relative w-96 mx-5 grid xs:grid-cols-1 "
          style={{ width: "500px" }}
        >
          <img
            className="w-full h-60 bg-blue-600 justify-center items-center rounded-t-xl"
            src="https://demo.ovatheme.com/dvents/wp-content/uploads/2017/06/texture-1.png"
            alt=""
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h2 className="text-white text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl font-bold transform scale-90 ">
              Do You want To Work With Us!
            </h2>
            <span className="text-white text-sm mx-3  ">
              If you have a good team for organizing events, you can be our part.
            </span>
            <div className="flex justify-center pt-5">
              <button  className="text-white bg-gra">Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className=" justify-center grid   ">
          <h1 className="text-red-600 pl-12 ">WORLDWIDE</h1>
          <h1 className="font-semibold text-3xl ">Our Sponsors</h1>
        </div>
      </div>
  
      <ScrollButton/>
      <div className="">
        <Sponsors />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

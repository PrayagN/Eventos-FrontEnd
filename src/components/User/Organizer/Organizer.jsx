import React, { useEffect, useState } from "react";
import {  Typography } from "@mui/material";
import { organizerList } from "../../../Services/userApi";
import List from "./List";
// import Card from "../../Admin/organizers/Card";
const Organizer = () => {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await organizerList();
      console.log(response.data.organizers);
      setOrganizers(response.data.organizers);
    };
    fetch();
  }, []);
  return (
    <div className="w-fll items-center">
      <div className="max-h-96 max-[1250px]: ">
        <h2 className="text-center  text-3xl  sm:text-3xl  md:text-3xl lg:text-4xl xl:text-5xl mt-24  text-gray-500">
          The <span style={{ color: "#1976d2" }}>Event Management</span>{" "}
          Specialists
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
      
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 pt-1 mx-14 gap-10 ">
        {organizers.map((organizer, index) => (
          <List
            key={index}
            description={organizer.description}
            title={organizer.organizerName}
            organizer={true}
            img={organizer.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default Organizer;

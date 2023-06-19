import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { eventOrganizers } from '../../../Services/userApi'
import Header from '../Header/Header2'
import { Typography } from "@mui/material";
import { photosAPI } from '../../../Services/photosApi'
import List from "../../User/Organizer/List";
function ServicesList() {
  const location = useLocation()
  const event_id = location?.state.id
  const [organizers,setOrganizers] = useState([])
  const [eventPhoto,seteventPhoto] = useState('')
  useEffect(()=>{
    eventOrganizers(event_id).then((response)=>{
      console.log(response.data.organizers);
      setOrganizers(response.data.organizers)
      seteventPhoto(response.data.eventPhoto)
    },[])
  })
  return (
    <div className='w-full items-center'>
      <Header image={`${photosAPI}eventsPhotos/${eventPhoto}`} />
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
         Bringing your vision to life with meticulous planning, exceptional design, and flawless execution,
          <br />
          We offer a full range of Events Management Services that scale to your
          needs & budget.
        </Typography>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3  mt-12 pt-1 ml-32 gap-5  ">
        {
          organizers.map((organizer, index) => (
            <List
              key={index}
              description={organizer.description}
              title={organizer.organizerName}
              // organizer={true}
              img={organizer.logo}
              id={organizer._id}
            />
          ))}
      </div>
    </div>
  )
}

export default ServicesList

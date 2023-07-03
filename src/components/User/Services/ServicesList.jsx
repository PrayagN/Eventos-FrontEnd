import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { eventOrganizers } from '../../../Services/userApi'
import Header from '../Header/Header2'
import { Typography } from "@mui/material";
import { photosAPI } from '../../../Services/photosApi'
import List from "../../User/Organizer/List";
import Pagination from '../Pagination/Pagination';
import ScrollButton from "../ScrollButton/ScrollButton";
function ServicesList() {
  const location = useLocation()
  const event_id = location?.state.id
  const [organizers,setOrganizers] = useState([])
  const [eventPhoto,seteventPhoto] = useState('')
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalOrganizers,setTotalOrganizers] = useState(0)
  const organizerLimitPerPage = 2;
  useEffect(()=>{
    eventOrganizers(event_id,activePage,searchQuery,organizerLimitPerPage).then((response)=>{
     
      setOrganizers(response.data.organizers)
      seteventPhoto(response.data.eventPhoto)
      setTotalOrganizers(response.data.total)
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
      <div className='flex justify-end'>

      <div
          className="relative mb-3 shadow-lg shadow-gray-600 rounded-xl mr-5"
          data-te-input-wrapper-init
        >
          <input
            type="text"
            className="peer rounded-xl min-h-[auto] w-full outline-none px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput1"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
          />
          {searchQuery.length === 0 && (
            <label className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary">
              Search
            </label>
          )}
        </div>
        </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3  mt-12 pt-1 ml-32 gap-5  ">
        { organizers.length >0 ?(

          organizers.map((organizer, index) => (
            <List
            key={index}
            description={organizer.description}
            title={organizer.organizerName}
            // organizer={true}
            budget={organizer.budget}
            img={organizer.logo}
            id={organizer._id}
            />
            ))
            ): ( <p className=' text-red-500'>There is no such data found</p>)}
            </div>
      <div className='flex justify-center'>
      <Pagination activePage ={activePage} limit ={organizerLimitPerPage} setActivePage={setActivePage} totalOrganizers ={totalOrganizers} />
      </div>
      <ScrollButton/>
    </div>
  )
}

export default ServicesList

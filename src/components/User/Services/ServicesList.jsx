import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { eventOrganizers } from '../../../Services/userApi'
import Header from '../Header/Header2'

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
  const [rating,setRating] = useState([])
  const [district, setDistrict] = useState([]);
  const [openDrop, setOpenDrop] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const organizerLimitPerPage = 2;
  useEffect(()=>{
    eventOrganizers(event_id,activePage,searchQuery,organizerLimitPerPage,selectedDistrict).then((response)=>{
     
      setOrganizers(response.data.organizers)
      seteventPhoto(response.data.eventPhoto)
      setTotalOrganizers(response.data.total)
      setRating(response.data.rating)
      setDistrict(response.data.district)
    },[activePage,searchQuery,selectedDistrict])
  })
  
  return (
    <div className='w-full items-center'>
      <Header image={`${import.meta.env.VITE_UserBaseUrl}eventsPhotos/${eventPhoto}`} />
      <div className="max-h-96 max-[1250px]:">
        <h2 className="text-center text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl mt-24 text-gray-500">
          The <span style={{ color: "#1976d2" }}>Event Management</span>{" "}
          Specialists
        </h2>
        <div
          
          className="text-center text-xl md:text-2xl   transform scale-90 mt-4 mb-5"
        >
         Bringing your vision to life with meticulous planning, exceptional design, and flawless execution,
          <br />
          We offer a full range of Events Management Services that scale to your
          needs & budget.
        </div>
      </div>
      
      <div className='flex justify-end flex-wrap'>
      <div className="pr-3">
          <button
            onClick={()=>setOpenDrop(!openDrop)}
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
      <div className="grid xl:grid-cols-3 md:grid-cols-3  mt-12 pt-1  gap-5 place-items-center  ">
        { organizers.length >0 ?(

          organizers.map((organizer, index) => (
            <List
            key={index}
            description={organizer.description}
            title={organizer.organizerName}
            // organizer={true}
            budget={organizer.budget}
            rating ={rating.find((item)=>item._id === organizer._id)?.ratings || 0}
            review ={rating.find((item)=>item._id === organizer._id)?.reviewCount||0}
            
            img={organizer.logo}
            id={organizer._id}
            />
            ))
            ): (<img src='../../../../src/assets/gallery/no_result.gif'/>)}
            </div>
      <div className='flex justify-center mt-2'>
      <Pagination activePage ={activePage} limit ={organizerLimitPerPage} setActivePage={setActivePage} totalOrganizers ={totalOrganizers} />
      </div>
      <ScrollButton/>
    </div>
  )
}

export default ServicesList

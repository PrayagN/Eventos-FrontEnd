import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { checkoutPayment, organizerView } from "../../../Services/userApi";
import { FcOk } from "react-icons/fc";
import toast,{Toaster} from 'react-hot-toast'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OrganizerView() {
  const [organizer, setOrganizer] = useState({});
  const [service, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [guests,setGuests] = useState('')
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const location = useLocation();
  const organizer_id = location?.state.id;
  console.log(organizer_id);

  useEffect(() => {
    if (organizer_id) {
      organizerView(organizer_id).then((response) => {
        if (response.data.organizer) {
          setOrganizer(response.data.organizer);
          setServices(response.data.organizer.service);
        } else {
          toast.error(response.data.message);
        }
      });
    }
  }, [organizer_id]);

  console.log(organizer);

 

const handleDate =(date)=>{
    setSelectedDate(date)
    

}
const handleGuests =(event)=>{
  setGuests(event.target.value)
  
}

const handleSubmit =()=>{
  if(!selectedDate || !guests){
    toast.error('please fill the details')
    return
  }
  const values ={
    selectedDate,guests,organizer_id
  }
  console.log(values);
  checkoutPayment(values).then((response)=>{
    if(response.data.url){
      
      window.location.href = response.data.url
    }
  }).catch((err)=>console.log(err.message))

}
  return (
    <div className="w-full">
      <div className="grid px-10 mx-10 gap-4 my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-5">
          <div className="w-full">
            <Card className="p-5">
              <div className="flex justify-between flex-col">
                <div className="flex flex-wrap items-center ml-5 mt-5">
                  <img
                    src={organizer.logo}
                    className="w-20 h-20 object-cover rounded-lg mb-2 md:mb-0 md:mr-4"
                    alt=""
                  />
                  <div className="flex flex-col justify-center">
                    <Typography 
                      variant="h2"
                      color="blue-gray"
                      className="mb-2 font-bold text-center md:text-left"
                    >
                      {organizer.organizerName}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex">
                <Typography>{organizer.description}</Typography>
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap  justify-center">
            <Card
              color="blue"
              variant="gradient"
              className="w-full max-w-[20rem] p-8 bg-blue-400 "
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal uppercase"
                >
                  standard
                </Typography>
                <Typography
                  variant="h1"
                  color="white"
                  className="mt-6 flex justify-center gap-1 text-4xl  flex-wrap font-normal"
                >
                  <span className="mt-2 text-lg">$</span>499{" "}
                  <span className="self-end text-2xl">/person </span>
                </Typography>
              </CardHeader>
              <CardBody className="p-0 ">
                <div className="flex flex-col gap-4">
                  <Typography variant="h6" color="white" className="uppercase ">
                    Check Availability
                  </Typography>
                  <div className="flex flex-col  md:flex-row md:justify-between gap-4">
                    <div className="flex flex-col ">
                      {/* <Typography
                        variant="h2"
                        color="blue-gray"
                        className="mb-2 font-bold"
                      ></Typography> */}
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <DatePicker
                                id="eventDate"
                                placeholderText="🗓️ Select Event Date"
                                selected={selectedDate}
                                onChange={handleDate}
                                className="px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                            <div className="pt-5">
                            <input type="text" value={guests} onChange={handleGuests} className="px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="👥 Guests" required/>

                            </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="mt-12 p-0">
                <Button
                  
                  color="white"
                  className={`text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100 ${isSubmitDisabled ? 'hover:':''} `}
                  ripple={false}
                  fullWidth={true}
                  onClick={handleSubmit}
                  
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 m-5 bg-slate-50">
          <div className="w-full">
            <Card className="mt-6 sm:h-auto md:h-60">
              <CardBody>
                <Typography
                  variant="h6"
                  color="blue"
                  className="uppercase mb-4"
                >
                  Details
                </Typography>

                <div className="flex flex-col gap-4 justify-center">
                  <div className="flex items-start flex-wrap">
                    <div>
                      <Typography
                        variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Email
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h1"  className="font-bold">
                        {organizer.email}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-start flex-wrap">
                    <div>
                      <Typography
                        variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Mobile
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h1"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {organizer.mobile}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-start flex-wrap">
                    <div>
                      <Typography
                        variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Venue
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h1"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {organizer.venue}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-start flex-wrap">
                    <div>

                    <Typography
                      variant="h1"
                      color="blue-gray"
                      className="w-24 mr-4 font-bold"
                      >
                      Address
                    </Typography>
                      </div>
                      <div>

                    <Typography
                      variant="h1"
                      color="blue-gray"
                      className="font-bold"
                      >
                      {organizer.district}
                    </Typography>
                      </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-full">
            <Card className="mt-6  sm:h-auto md:h-60">
              <CardBody>
                <Typography
                  variant="h6"
                  color="blue"
                  className="uppercase mb-4"
                >
                  Services
                </Typography>

                <div className="flex justify-start  ">
                  <ul className="flex flex-wrap gap-4">
                    {service.map((service, index) => (
                      <div className="flex" key={index}>

                      <li className="flex items-start gap-4" >
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <FcOk className="h-5 w-5" />
                        </span>
                        <Typography className="font-normal">
                          {service}
                        </Typography>
                      </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <Typography variant="h3" color="blue" className="uppercase mb-4">
            Gallery
          </Typography>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap">
            {organizer.images?.map((image, index) => (
              <div className="w-full md:w-1/3 p-1 md:p-2" key={index}>
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default OrganizerView;

import React, { useEffect, useState } from "react";
import { AcceptOrganizer, viewOrganizer } from "../../../Services/adminApi";
import AdminLogo from "../../common/AdminLogo";
import { useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import Shimmer from '../../common/Shimmer';
import "tailwindcss/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

function OrganizerView() {
  const [organizer, setOrganizer] = useState({});
  const [isAccepted, setIsAccepted] = useState();
  const [services,setServices] = useState([])
  const [conductedCount,setConductedCount] = useState('')
  const location = useLocation();
  const organizer_id = location?.state.id;
  console.log(isAccepted);
  useEffect(() => {
    if (organizer_id) {
      viewOrganizer(organizer_id).then((response) => {
        if (response.data.organizer) {
          setOrganizer(response.data.organizer);
          setServices(response.data.organizer.service)
          setConductedCount(response.data.count)
          const status = response.data.organizer.status;
          setIsAccepted(status);
        } else {
          toast.error(response.data.message);
        }
      });
    }
  }, [organizer_id, isAccepted]);
console.log(services);
  const handleButton = () => {
    AcceptOrganizer(organizer_id).then((response) => {
      if (response.data.status) {
        setIsAccepted(true);
        toast.success("accepted the Organizer");
      } else if (response.data.statuses) {
        setIsAccepted(false);
        toast.error("rejected the Organizer");
      }
    });
  };
  const date = new Date(organizer.createdAt)
  const joinDate =date.toLocaleDateString()

  return (
    <div className="w-full mx-3">
      <div className="w-full">
        <AdminLogo />
      </div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="w-full md:w-2/6">
          <Card className="mt-6">
            <div className="flex justify-center">
              <CardHeader color="blue-gray" className="relative w-32">
                <img src={organizer.logo} alt="" />
              </CardHeader>
            </div>
            <CardBody>
              <div className="flex justify-center">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 font-bold"
                >
                  {organizer.organizerName}
                </Typography>
              </div>
              <div className="h-60  overflow-y-auto scrollbar-hide">

              <Typography  >{organizer.description}</Typography>
              </div>
            </CardBody>
            <div className="flex justify-center gap-20 m-5">
              <button
                onClick={handleButton}
                className={`relative inline-flex items-center justify-start px-4 py-1 overflow-hidden font-medium transition-all rounded-full ${
                  isAccepted === "true" ? "bg-red-600" : "bg-green-700"
                } group-hover:bg-white group`}
              >
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span
                  className={`relative w-full text-left ${
                    isAccepted === "true"
                      ? "text-white group-hover:text-red-600"
                      : "text-white group-hover:text-green-600"
                  } transition-colors duration-200 ease-in-out  `}
                >
                  {isAccepted === "true" ? "Reject" : "Accept"}
                </span>
              </button>
              {/* <button onClick={handleButton}>
                {isAccepted ==='true' ? 'Reject':'Accept'}
              </button> */}
            </div>
          </Card>
        </div>
        <div className="w-auto md:w-4/6">
        <Card className="p-2">
  <div className="flex flex-col md:flex-row md:items-center w-full md:gap-6 mb-4 p-5">
    <div className="flex flex-col md:flex-row md:gap-4 lg:gap-40">
      <label>
        OrganizerName
        <Input
          variant="static"
          className="w-full md:w-auto lg:w-80"
          style={{ fontWeight: "bold" }}
          value={organizer.organizerName}
        />
      </label>
      <label>
        Email
        <Input
          variant="static"
          className="w-full md:w-auto lg:w-auto"
          style={{ fontWeight: "bold" }}
          value={organizer.email}
        />
      </label>
    </div>
  </div>
  <br />
  <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-28">
    <label>
      Mobile
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={organizer.mobile}
      />
    </label>
    <label>
      Event
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={organizer.event}
      />
    </label>
    <label>
      Join Date
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={joinDate}
      />
    </label>
  </div>
  <br />
  <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-40">
    <label>
      District
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-80"
        style={{ fontWeight: "bold" }}
        value={organizer.district}
      />
    </label>
    <label>
      Venue
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={organizer.venue}
      />
    </label>
  </div>
  <br />
  <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-28">
   
    <label>
      Conducted
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={conductedCount}
      />
    </label>
    <label>
      Budget
      <Input
        variant="static"
        className="w-full md:w-auto lg:w-auto"
        style={{ fontWeight: "bold" }}
        value={organizer.budget}
      />
    </label>
  </div>
  <br />
  <div className="flex flex-col md:flex-row md:items-center w-full">
  <label className="w-full " >
    Services
  <Input
    variant="static"
    className="w-full "
    id="services"
    value={services.join('  ,  ')}
    style={{ fontWeight: 'bold' }}
    />
    </label>
</div>

</Card>

</div>

     
     
      <Toaster />
      </div>
      <div className="flex justify-center items-center mt-8">
  <div className="w-1/2 aspect-w-16 aspect-h-9">
    <Carousel className="h-full">
      {organizer.images?.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Carousel Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Carousel>
  </div>
</div>


    </div>
  );
}

export default OrganizerView;

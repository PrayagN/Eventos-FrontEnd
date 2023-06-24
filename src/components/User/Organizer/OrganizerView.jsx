import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { organizerView, reviewOrganizer } from "../../../Services/userApi";
import { FcOk } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
  Rating,
  Textarea,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkout from "../Payment/Checkout";
import Reviews from "./Reviews";
import ScrollButton from "../ScrollButton/ScrollButton";

function OrganizerView() {
  const [organizer, setOrganizer] = useState({});
  const [service, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [guests, setGuests] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rated, setRated] = React.useState(1);
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState([]);
  const [done, setDone] = useState("");

  const location = useLocation();
  const organizer_id = location?.state.id;
  const authorized = useSelector((state) => state.user.authorized);

  const rateOrganizer = () => {
    reviewOrganizer(organizer_id, rated, review)
      .then((response) => {
        if (response.data.status) {
          setIsOpen(true);
        } else if (response.data.message) {
          setIsOpen(false);
          toast.success(response.data.message);
        } else if (response.data.message1) {
          console.log("yes");
          setDone("yes");
          setIsOpen(false);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    if (organizer_id) {
      organizerView(organizer_id).then((response) => {
        if (response.data.organizer) {
          setOrganizer(response.data.organizer);
          setServices(response.data.organizer.service);
          setShowReview(response.data.review);

          const excludedDates = response.data.bookedDates.map((dateString) => {
            const date = new Date(dateString);
            date.setDate(date.getDate() - 1); // Subtract one day from the date
            return date;
          });

          setBookedDates(excludedDates);
        } else {
          toast.error(response.data.message);
        }
      });
    }
  }, [organizer_id, done]);

  const organizername = organizer.organizerName;
  const budget = organizer.budget;
  const advance = organizer.advance;

  const handleDate = (date) => {
    setSelectedDate(date);
  };
  const handleGuests = (event) => {
    setGuests(event.target.value);
  };
  const values = {
    selectedDate,
    guests,
    organizer_id,
    organizername,
    budget,
    advance,
  };

  const handleSubmit = () => {
    if (!selectedDate || !guests) {
      toast.error("please fill the details");
      return;
    }
    setIsSubmitted((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <div className="grid px-10 mx-10 gap-4 my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-5">
          <div className="w-full">
            <Card className="p-5">
              <div className="flex justify-between flex-col">
                <div className="flex flex-wrap items-center  ml-5 mt-5">
                  <img
                    src={organizer.logo}
                    className="w-20 h-20 object-cover rounded-lg mb-2 md:mb-0 md:mr-4"
                    alt=""
                  />
                  <div className="flex flex-col justify-center">
                    <h1
                      color="blue-gray"
                      className="mb-2 font-bold text-center md:text-left text-4xl uppercase"
                    >
                      {organizer.organizerName}
                    </h1>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center text-2xl m-6">
                <div className="flex justify-center font-semibold bg-slate-50 border-b-2">
                  <h1>About us</h1>
                </div>
              </div>

              <div className="flex">
                <h1>{organizer.description}</h1>
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap  justify-center">
            <Card
              color="blue"
              variant="gradient"
              className="w-full max-w-[20rem] p-8 bg-blue-500 "
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
              >
                <h1 className="font-normal uppercase text-white">standard</h1>
                <h1 className="mt-6 flex justify-center gap-1 text-4xl text-white  flex-wrap font-normal">
                  <span className="mt-2 text-lg">
                    <BiRupee />
                  </span>
                  {organizer.budget}{" "}
                  <span className="self-end text-2xl">/person </span>
                </h1>
              </CardHeader>
              <CardBody className="p-0 ">
                <div className="flex flex-col gap-4">
                  <h6 className="uppercase ">Check Availability</h6>
                  <div className="flex flex-col  md:flex-row md:justify-between gap-4">
                    <div className="flex flex-col ">
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <DatePicker
                                id="eventDate"
                                placeholderText="🗓️ Select Event Date"
                                selected={selectedDate}
                                onChange={handleDate}
                                minDate={new Date()}
                                autoComplete="off"
                                excludeDates={bookedDates}
                                className="px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-5">
                        <input
                          type="text"
                          value={guests}
                          onChange={handleGuests}
                          className="px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="👥 Guests"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="mt-12 p-0">
                <Button
                  color="white"
                  className={`text-blue-500 hover:scale-[1.02] focus:scale-[1.02] active:scale-100  `}
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
                <h6 className="uppercase mb-4 text-blue-500 font-bold">
                  Details
                </h6>

                <div className="flex flex-col gap-4 justify-center">
                  <div className="flex items-start flex-wrap">
                    <div>
                      <Typography
                        // variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Email
                      </Typography>
                    </div>
                    <div>
                      <h1 className="font-bold">{organizer.email}</h1>
                    </div>
                  </div>

                  <div className="flex items-start flex-wrap">
                    <div>
                      <Typography
                        // variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Mobile
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
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
                        // variant="h1"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Venue
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        // variant="h1"
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
                        variant="h6"
                        color="blue-gray"
                        className="w-24 mr-4 font-bold"
                      >
                        Address
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        // variant="h1"
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
                        <li className="flex items-start gap-4">
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
          <Typography
            color="blue"
            className="uppercase mb-4 text-2xl font-bold"
          >
            Gallery
          </Typography>
        </div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 ">
          <div className="-m-1 flex flex-wrap">
            {organizer.images?.map((image, index) => (
              <div className="w-full md:w-1/3 p-1 md:p-2" key={index}>
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center "
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-10 px-10 my-5">
          <div className="flex justify-between">
            <h1 className="text-2xl text-black font-medium mx-5">
              Rating & Reviews
            </h1>
            {authorized && (
              <div className="flex  justify-end">
                <button
                  className="shadow-lg p-4 shadow-gray-400 cursor-pointer rounded-lg"
                  onClick={rateOrganizer}
                >
                  Rate Organizer
                </button>
              </div>
            )}
          </div>
          <div className="px-10">
            {showReview.length > 0 ? (
              <Reviews review={showReview} />
            ) : (
              <p className="text-lg ">No Ratings Yet</p>
            )}
          </div>
        </div>
      </div>
      <div></div>
      {isSubmitted && <Checkout status={isSubmitted} values={values} />}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
          <div className="relative flex flex-col items-center bg-gray-50 w-1/3 rounded-lg">
            <button
              className="place-self-end mx-2 my-2 text-red-600"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <ImCross />
            </button>
            <div className="bg-black opacity-10 inset-0 z-0" />
            <div className="sm:max-w-lg w-full p-2  bg-white rounded-xl z-10">
              <label className="text-xl flex justify-center font-bold text-black tracking-wide">
                Rate & Review
              </label>
              <br />

              <div className="flex justify-center gap-2">
                <Rating
                  value={1}
                  className="text-yellow-400"
                  onChange={(value) => setRated(value)}
                />
                <Typography color="blue-gray" className="font-medium">
                  {rated}.0 Rated
                </Typography>
              </div>
              <br />
              <div className="grid grid-cols-1 space-y-2">
                <div className="flex items-center justify-center w-full">
                  {/* <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center"> */}
                  <div className="w-full">
                    <Textarea
                      className="w-full h-96 "
                      style={{ borderColor: "black" }}
                      placeholder="write your review"
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  {/* </div>
                  </label> */}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={rateOrganizer}
                  type="submit"
                  className="my-5  bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ScrollButton/>
      <Toaster />
    </div>
  );
}

export default OrganizerView;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { organizerView, reviewOrganizer } from "../../../Services/userApi";
import { FcOk } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { RiCloseCircleFill } from "react-icons/ri";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
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
  /// chat
  const [chatModal, setChatModal] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");

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

  // chat

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((element) => codeArray.push("0x" + element));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };

  const submitChat = () => {
    setShowEmoji(false);
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
                <div className="flex justify-center font-semibold  border-b-2">
                  <h1>About us</h1>
                </div>
              </div>

              <div className="flex">
                <h1>{organizer.description}</h1>
              </div>
              <div className="flex justify-end items-center w-full">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setChatModal(true)}
                >
                  <img
                    className="w-12 h-12"
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/message-button-8126891-6507155.png"
                    alt=""
                  />
                  {/* <div className="shadow-lg shadow-gray-600">chat with us</div> */}
                </button>
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
      {chatModal && (
        <div className="fixed bottom-0 right-0 w-96 max-h-[100]  bg-white rounded-lg shadow-lg shadow-gray-500 mx-2">
          <div className="relative flex items-center  justify-between p-3 border-b border-gray-300">
            <div className="flex items-center">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={organizer?.logo}
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">
                {organizer.organizerName}
              </span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="cursor-pointer" onClick={() => {setChatModal(false),setShowEmoji(false)}}>
              {<RiCloseCircleFill className="w-5 h-5 text-red-600" />}
            </div>
          </div>
          <div className="relative w-full p-6 overflow-y-auto max-h-[30rem]">
            <ul className="space-y-2">
              <li className="flex justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span className="block">Hi</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">Hiiii</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">How are you?</span>
                </div>
              </li>
              <li className="flex justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span className="block">I'm good. How about you?</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">I'm doing great!</span>
                </div>
              </li>
              <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">That's good to hear!</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">That's good to hear!</span>
                    </div>
                                    </li>

                  
            </ul>
          </div>
            
          <div className="flex items-center justify-between w-full  p-3 border-t border-gray-300">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-yellow-300 animate-pulse"
              
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="grey"
              >
                <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zm3.493-13a1.494 1.494 0 1 1-.001 2.987A1.494 1.494 0 0 1 15.493 9zm-4.301 6.919a4.108 4.108 0 0 0 1.616 0c.253-.052.505-.131.75-.233.234-.1.464-.224.679-.368.208-.142.407-.306.591-.489.183-.182.347-.381.489-.592l1.658 1.117a6.027 6.027 0 0 1-1.619 1.621 6.003 6.003 0 0 1-2.149.904 6.116 6.116 0 0 1-2.414-.001 5.919 5.919 0 0 1-2.148-.903 6.078 6.078 0 0 1-1.621-1.622l1.658-1.117c.143.211.307.41.488.59a3.988 3.988 0 0 0 2.022 1.093zM8.5 9a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 9z"></path>
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Message"
              className="block w-full py-2 pl-4 mx-5 bg-gray-100 rounded-full outline-none focus:text-gray-700"
              name="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {/* <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button> */}
            <button type="submit" onClick={submitChat}>
              <svg
                className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {showEmoji && (
  <div className="fixed bottom-0 right-80 m-12 flex justify-center">
    <Picker
 data={data}
 emojiSize={20}
 emojiButtonSize={28}
 rows={3} // Specify the number of rows you want to display
 onEmojiSelect={addEmoji}
 theme="light"
 onClickOutside ='null'
      
    />
  </div>
)}

      {chatModal ? " " : <ScrollButton />}
      <Toaster />
    </div>
  );
}

export default OrganizerView;

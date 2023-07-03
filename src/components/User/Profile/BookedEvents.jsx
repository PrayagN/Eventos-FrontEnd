import React, { useEffect, useState } from "react";
import { bookedEvents, cancelBooking } from "../../../Services/userApi";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

function BookedEvents() {
  const [bookedDetails, setBookedDetails] = useState([]);
  const [cancel, setCancel] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bookedEvents().then((response) => {
      setBookedDetails(response.data.essentialData);
    });
  }, [cancel]);
  const getMonth = (date) => {
    return new Date(date).toLocaleString("en-US", { month: "long" });
  };
  const CancelBooking = () => {
    setLoading(true);
    cancelBooking(selectedId)
      .then((response) => {
        setLoading(false);
        setCancel("true");
        setShowConfirmation(false);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  console.log(bookedDetails);
  return (
    <div className=" ">
      <div className="flex flex-wrap justify-between gap-10 p-5">
        {bookedDetails.map((booked, index) => (
          <div
            key={index}
            className="flex flex-wrap bg-blue-400 rounded-xl shadow-lg p-1 shadow-gray-300"
          >
            <div className="flex flex-wrap bg-white p-4 gap-10  rounded-xl ">
              <div className="">
                <h1 className="text-2xl font-bold">Booking Details</h1>

                <br />
                <div className="flex flex-wrap gap-10 ">
                  <div>
                    <label>Order Amount</label>
                    <p>INR {booked.organizer.budget}/Person</p>
                  </div>
                  <div>
                    <label>Advance Amount</label>
                    <p>INR {booked.advanceAmount}.00</p>
                  </div>
                  <div>
                    <label>Total Amount</label>
                    <p>INR {booked.totalAmount}.00</p>
                  </div>
                </div>
                <br />
                <hr />
                <br />
                <p className="font-bold">Event Details</p>
                <br />

                <div className="">
                  <div className="gap-5 flex flex-wrap md:mt-2">
                    <div className=" w-32">
                      <h1>Event</h1>
                    </div>
                    <div className=" ">
                      <p>{booked.organizer.event}</p>
                    </div>
                  </div>

                  <div className="gap-5 flex flex-wrap md:mt-2 ">
                    <div className=" w-32">
                      <h1>Organizer</h1>
                    </div>
                    <div>
                      <p className="">{booked.organizer.organizerName}</p>
                    </div>
                  </div>
                  <div className="gap-5 flex flex-wrap md:mt-2">
                    <div className=" w-32">
                      <h1>Venue</h1>
                    </div>
                    <div>
                      <p className="first-letter:uppercase">
                        {booked.organizer.venue}
                      </p>
                    </div>
                  </div>
                  <div className="gap-5 flex flex-wrap md:mt-2">
                    <div className="flex justify-start w-32">
                      <h1>Event Scheduled</h1>
                    </div>
                    <div>
                      <p>{booked.eventScheduled.slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
                <br />
              </div>
              <div className="flex justify-center">

          
              <div className=" h-min   ">
                <div className="">
                  <div className="w-full shadow-lg rounded-xl p-5 ">
                    <div className="flex justify-center  text-4xl font-bold text-blue-600">
                      <h1 style={{ fontSize: "4rem" }}>
                        {booked.eventScheduled.slice(8, 10)}
                      </h1>
                    </div>

                    <div className="flex justify-center mt-5">
                      <p className="-tracking-tighter">
                        {getMonth(booked.eventScheduled)}
                      </p>
                    </div>
                    <div className="flex justify-center text-sm pb-3">
                      <p>{booked.eventScheduled.slice(0, 10)}</p>
                    </div>
                    <hr />
                    <div className="flex justify-center pt-2">
                      <p className="text-gray-400">#booking ID</p>
                    </div>
                    <div className="flex justify-center">
                      <p>STMZ2020{index + 1}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={() => {
                      setShowConfirmation(true, setSelectedId(booked._id));
                    }}
                    disabled={
                      booked.payment === "Refunded" ||
                      booked.payment === "Completed"
                    }
                    className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all ${
                      booked.payment === "Refunded"
                        ? "bg-gray-500"
                        : booked.payment === "Completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } rounded-xl group`}
                  >
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                      <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                      {booked.payment === "Refunded"
                        ? "Cancelled"
                        : booked.payment === "Completed"
                        ? "Completed"
                        : "Cancel"}
                    </span>
                  </button>
                </div>
                {showConfirmation && (
                  <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                    <div className="p-4 w-full max-w-md">
                      <div className="relative p-4 text-center bg-white rounded-lg shadow transform transition-all duration-300 scale-100 opacity-100">
                        <button
                          type="button"
                          onClick={() => {
                            setShowConfirmation(false), setLoading(false);
                          }}
                          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="flex flex-wrap justify-center text-3xl">
                          <h1>Are you sure you want to cancel</h1>
                        </div>
                        <div className="bg-[#feecdc] p-3  m-2 flex flex-wrap text-sm font-arim font-semibold ">
                          <div>
                            <h1 className="flex justify-start items-center gap-2 text-red-500 animate-pulse ">
                              <AiFillWarning />
                              Warning
                            </h1>
                          </div>

                          <p className="mb-4 text-red-500 flex justify-start text-left ">
                            Cancellations made within 7 days to the event will
                            incur a 50% fee.
                          </p>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowConfirmation(false), setLoading(false);
                            }}
                            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
                          >
                            No, cancel
                          </button>
                          <button
                            type="button"
                            onClick={CancelBooking}
                            className={`flex py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
                              loading ? " cursor-not-allowed" : ""
                            }`}
                            // disabled={loading}
                          >
                            {loading ? (
                              <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-30 text-white"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="white"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-100"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.418 0 8-3.582 8-8h-2c0 3.866-3.134 7-7 7V17z"
                                ></path>
                              </svg>
                            ) : null}
                            {loading ? "Loading..." : "Yes, I'm sure"}{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookedEvents;

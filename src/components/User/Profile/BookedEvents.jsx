import React, { useEffect, useState } from "react";
import { bookedEvents } from "../../../Services/userApi";

function BookedEvents() {
  const [bookedDetails, setBookedDetails] = useState([]);
  useEffect(() => {
    bookedEvents().then((response) => {
      setBookedDetails(response.data.essentialData);
    });
  }, []);
  const getMonth = (date) => {
    return new Date(date).toLocaleString("en-US", { month: "long" });
  };

  return (
    <div className=" ">
      <div className="flex flex-wrap justify-between gap-10 p-5">
        {bookedDetails.map((booked, index) => (
          <div
            key={index}
            className="flex flex-wrap bg-blue-400 rounded-xl shadow-lg p-1 shadow-gray-300"
          >
            <div className="flex bg-white p-4 gap-10  rounded-xl ">
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
                <hr />
              </div>
              <div className="flex justify-center    h-min  ">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookedEvents;

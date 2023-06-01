import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

function Dashboard() {
  const open = useSelector((state) => state.sidebar.open);
  console.log(open, "sidebar1");
  return (
    <div className="w-full h-screen bg-gray-100 ">
      <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-4  ${open ? "ml-0" : "ml-32"}`}>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
      </div>

      <div className={`flex flex-col md:flex-row md:gap-5 ${open ? 'ml-0':'ml-32'}  `}>
        <div className="w-full md:w-1/3">
          <div className="bg-white h-96 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600">
            <h1 className="p-2">Latest Organizers</h1>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="bg-white h-96 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600">
            <h1 className="p-2">Latest Booking</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
  
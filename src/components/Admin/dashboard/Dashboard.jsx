import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import AdminLogo from "../../common/AdminLogo";
import { useNavigate } from "react-router-dom";
import { loadDashboard } from "../../../Services/adminApi";
import { BiArrowFromLeft } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import SmallCard from "./smallCards/SmallCard";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState();
  const [booked,setBooked] = useState([])
  const open = useSelector((state) => state.sidebar.open);
  
  useEffect(() => {
    loadDashboard().then((response) => {
      setDashboard(response.data.necessaryData);
      setBooked(response.data.necessaryData.bookedData)
    });
  }, []);

  const handleClick = (organizer_id) => {
    navigate(`/admin/organizers/view`, {
      state: { organizer_id: organizer_id },
    });
  };
console.log(booked,'sdfsd');
  
  const totalPrice = dashboard?.totalEarning.toLocaleString('en-US', {
    style: 'currency',
    currency: 'INR',
  });
  return (
    <div className="w-full h-screen ">
      <AdminLogo />

      <div className="flex flex-wrap justify-center">
        <SmallCard
          count={dashboard?.organizerCount}
          path={
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          }
          name="Organizers"
        />
        <SmallCard
          name="Clients"
          count={dashboard?.clientCount}
          path={
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
          }
        />
        <SmallCard name="Booked Events" count={dashboard?.bookedCount} path={<path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-4.588 15-2.449-1.288L9.514 19l.468-2.728L8 14.342l2.738-.398 1.225-2.48 1.225 2.48 2.738.398-1.981 1.931.467 2.727zM19 9H5V7h14v2z"></path>} />

        <SmallCard name='Total Earnings' count ={totalPrice} path={<path d="M20 4H4c-1.103 0-2 .897-2 2v2h20V6c0-1.103-.897-2-2-2zM2 18c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-6H2v6zm3-3h6v2H5v-2z"></path>} />
      </div>
      

      <div
        className={`flex flex-col justify-center  md:flex-row md:gap-5 ${
          open ? "ml-0" : "ml-32"
        }`}
      >
        <div className="w-full md:w-1/3 ">
          <div className="bg-white h-auto m-4 md:m-12 rounded-xl shadow-lg shadow-gray-600">
            <h1 className="p-2">Latest Organizers</h1>
            <div>
              {dashboard?.organizers.map((organizer, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center p-2">
                    <img
                      src={organizer.logo}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      alt=""
                    />
                    <div className="flex justify-between w-full px-2">
                      <span className="text-md font-semibold capitalize">
                        {organizer.organizerName}
                      </span>
                      <BiArrowFromLeft
                        className="cursor-pointer"
                        onClick={() => handleClick(organizer.organizer_id)}
                      />
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <div className="bg-white h-auto m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600">
            <h1 className="p-2">Latest Booking</h1>
            <table className="w-full text-sm text-left text-gray-900 font-semibold">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Sl.no
                </th>
                <th scope="col" className="px-6 py-3">
                  Organizer
                </th>
                <th scope="col" className="px-6 py-3">
                  Client
                </th>
                <th scope="col" className="px-6 py-3">
                  Event
                </th>
                <th scope="col" className="px-6 py-3">
                  EventScheduled
                </th>
                <th scope="col" className="px-6 py-3">
                  PaymentStatus
                </th>
              </tr>
            </thead>
            <tbody>
              {booked.map((customer, index) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50 "
                  key={index}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {/* <img
                      className="w-10 h-10 rounded-full"
                      src="https://cliply.co/wp-content/uploads/2020/08/442008112_GLANCING_AVATAR_3D_400px.gif"
                      alt=""
                    /> */}
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {customer.organizerName}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 first-letter:uppercase">{customer.clientName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "} */}
                      {<span>{customer.event}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.eventScheduled.slice(0,10)}</td>
                  <td className="px-6 py-4">{customer.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

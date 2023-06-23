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
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
    loadDashboard().then((response) => {
      setDashboard(response.data.necessaryData);
    });
  }, []);

  const handleClick = (organizer_id) => {
    navigate(`/admin/organizers/view`, {
      state: { organizer_id: organizer_id },
    });
  };

  console.log(dashboard);

  return (
    <div className="w-full h-screen ">
      <AdminLogo />

      <div className="flex flex-wrap justify-center">
        <SmallCard
          count={dashboard?.organizerCount}
          path={
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          }
        name ='Organizers'
        />
        <SmallCard name='Clients' count ={dashboard?.clientCount} path={<path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>} />
        <SmallCard name='Booked Events' count={dashboard?.bookedCount} />

        <SmallCard />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

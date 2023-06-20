import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import AdminLogo from "../../common/AdminLogo";
import { useNavigate} from "react-router-dom";
import { loadDashboard } from "../../../Services/adminApi";
import { BiArrowFromLeft } from "react-icons/bi";
function Dashboard() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState();
  const open = useSelector((state) => state.sidebar.open);
  useEffect(() => {
    loadDashboard().then((response) => {
      setDashboard(response.data.necessaryData);
    });
  }, []);
  const handleClick =(organizer_id)=>{
    navigate(`/admin/organizers/view`,{state:{organizer_id:organizer_id}})
  }
  console.log(dashboard);
  return (
    <div className="w-full h-screen bg-gray-100 ">
      <AdminLogo />
      <div
        className={`grid gap-4 md:grid-cols-2 xl:grid-cols-4  ${
          open ? "ml-0" : "ml-32"
        }`}
      >
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
        <div className="bg-white h-32 m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600"></div>
      </div>

      <div
        className={`flex flex-col md:flex-row md:gap-5 ${
          open ? "ml-0" : "ml-32"
        }  `}
      >
        <div className="w-full md:w-1/3">
          <div className="bg-white h-96 m-4 md:m-12 rounded-xl  shadow-lg shadow-gray-600">
            <h1 className="p-2">Latest Organizers</h1>
            <div>
              {dashboard?.organizers.map((organizer, index) => (
                <>
                  <div key={index} className="flex items-center p-2">
                    <img
                      src={organizer.logo}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      alt=""
                    />
                    <div className="flex justify-between w-full px-2 ">
                      <span className="text-md font-semibold first-letter:uppercase ">
                        {organizer.organizerName}
                        {organizer.organizer_id}
                      </span>

                      <BiArrowFromLeft className="cursor-pointer" onClick={() => handleClick(organizer.organizer_id)}
 />
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
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

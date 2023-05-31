// import React, { useState } from 'react'
// import {BiChevronLeft} from 'react-icons/bi'
// import EventosLogo   from '../../../assets/EventosLogo.png'
// function Sidebar() {
//     const [toggle,setToggle] = useState(false)
//   return (

//     <div className={`${toggle ? 'w-[5.8rem]':''} sidebar-container`}>
//         <div className={`flex gap-5 items-center ${toggle ? "bg-none transition-all duration-300 delay-200":"bg-slate-300 rounded-xl p-2"}`}>
//             <div className='min-w-[3.5rem] h-[3.5rem]'>
//                     <img src={EventosLogo} alt="" className='w-full h-full rounded-full object-cover' />
//             </div>
//             <div className={toggle ? 'opacity-0 delay-200':''}>
//                 <h3 className='text-xl' >Eventos</h3>
//                 <span className='text-[0.75rem] opacity-60'>Admin</span>
//             </div>

//         </div>
//         <div className='absolute top-[1.5rem]  flex justify-center items-center -left-5 w-10 h-10 bg-opacity-30 backdrop-filter backdrop-blur-lg bg-gray-100 rounded-full cursor-pointer' onClick={()=>{
//             setToggle(!toggle)
//         }}>
//     <BiChevronLeft className={`${toggle ? "rotate-180":''} text-3xl transition-all duration-300`} />
//         </div>
//     </div>
//   )
// }

// export default Sidebar

import React, { useState,useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { SiEventstore } from "react-icons/si";
import { VscOrganization } from "react-icons/vsc";
import { BiLogOutCircle } from "react-icons/bi";
import EventosLogo from "../../../assets/EventosLogo.png";
import {useDispatch} from 'react-redux'
import {sidebarAction} from '../../../app/sidebarSlice'

function Sidebar() {
  const dispatch = useDispatch()
  const menu = [
    // { name: "Eventos", link: "/admin/", icon: EventosLogo, size: true },
    { name: "Dashboard", link: "/admin/", icon: MdOutlineDashboard },
    { name: "Customers", link: "/admin/customers", icon: IoIosPeople },
    { name: "Events", link: "/admin/events", icon: SiEventstore },
    { name: "Organizers", link: "/admin/organizers", icon: VscOrganization },
    {
      name: "Logout",
      link: "/admin/signin",
      icon: BiLogOutCircle,
      margin: true,
    },
  ];
  const [open, setOpen] = useState(true);
  dispatch(sidebarAction.setOpen(open))
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
   


    <div className="flex  gap-6 shadow-lg shadow-gray-300 bg-white ">
      <div
        className={`bg-white min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-black px-4`}
        >
        <div className="py-3 flex justify-end ">
          <div
            className={`${
              open ? "block" : "hidden"
            } flex pr-32 text-black text-xl font-bold gap-2`}
          >
            <img src={EventosLogo} className="w-7" alt="" />
            <h1>Eventos</h1> 
            
          </div>
          {open ? (
              <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <img
              src={EventosLogo}
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
              />
              )}
              
        </div>
              <p className={`text-gray-900 font-semibold text-lg m-3 ${open ?'block':'hidden'} text-[#1976d2] `}>Welcome Admin🫡</p>
              {/* <p className="fixed bottom-0 right-0 p-4 text-gray-500">
         Time: {currentTime.toLocaleTimeString()}
         </p> */}
              
        <div className="mt-20 flex flex-col gap-4 relative">
          {/* <div className="m-3 text-xl text-gray-900 font-semibold">Eventos</div> */}
          {menu?.map((menu, index) => (
            <Link
              to={menu?.link}
              key={index}
              className={`${
                (menu?.margin && "mt-10  ") || (menu?.size && "text-xl")
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:text-[#1976d2]`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>

              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font--semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
             
              
  );
}

export default Sidebar;

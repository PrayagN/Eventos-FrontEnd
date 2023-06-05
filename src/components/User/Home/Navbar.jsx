import React, { useEffect, useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EventosLogo   from '../../../assets/EventosLogo.png'
function Navbar() {
    const [user,setUser] = useState(localStorage.getItem('usertoken'))
  const navigate = useNavigate()
    const handleLogout =()=>{
        localStorage.clear('usertoken')
        setUser(null)
        navigate('/')
        
    }
  let Links = [
    { name: "Home", link:'/' },
    { name: "Services", link: "/services" },
    { name: "Organizers", link: "/organizers" },
  ];
  const [isOpen, setisOpen] = useState(false);
  
  return (
    <div className="shadow-md w-full  ">
      <div className="md:px-10 py-4  md:flex justify-between items-center bg-white">
        <div className="flex text-2xl cursor-pointer items-center gap-2">
        <img className="w-12  sm:w-12 md:w-16 lg:w-16 xl:w-16 mx-4  " src={EventosLogo} alt="" /> <span className="font-bold " style={{marginLeft:'-20px'}}>Eventos</span><br />
        </div>
        <div
          onClick={() => setisOpen(!isOpen)}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden "
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={` md:flex pl-9 md:pl-0   pr-20 mr-20  md:items-center  absolute bg-white  md:static  md:z-auto z-[-1] left-0 w-full md:w-auto   transition-all duration-500 ease in ${
            isOpen ? "top-12 " : "top-[-490px] "
          }`}
        >
          {Links.map((link, index) => (
            <li
              key={index}
              className="font-semibold cursor-pointer my-7 md:my-0 md:ml-8 text-black "
              >
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
          <li className="ml-5">
           { user ?

               <Link>
            <li className="font-semibold cursor-pointer my-7 md:my-0 md:ml-8 text-red-500 opacity-100" onClick={handleLogout}>
              Log out 
            </li >
            </Link>:
              <Link to='/signin' >
              <li className="font-semibold cursor-pointer my-7 md:my-0 md:ml-8 text-blue-500 opacity-100" >
                Log in
              </li>
              </Link>
        }
          </li>
        </ul>
      </div>
      <div className=" md:mx-22 mx-16 sm:mx-20 -mt-7 sm:-mt-7 md:-mt-9 lg:-mt-9 xl:-mt-9  lg:mx-32 xl:mx-32  pb-5 "  >
        <span className="text-xs grid text-gray-400">Making Events Simpler</span>
        </div>

    </div>
  );
}

export default Navbar;

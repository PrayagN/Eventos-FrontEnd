import React, { useEffect, useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, NavLink } from "react-router-dom";
import EventosLogo from "../../../assets/EventosLogo.png";
import { userAuth } from "../../../Services/userApi";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../Redux/app/userSlice";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import defaultAvatar from "/logoutAvatar.avif";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(defaultAvatar);
  const [modal, setModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    userAuth()
      .then((response) => {
        if (response.data.auth) {
          if (response.data.userData.image) {
            setImage(response.data.userData.image);
          }
          dispatch(userActions.userLogin());
        }
      })
      .catch((response) => {
        if (response) {
          dispatch(userActions.userLogout());
          localStorage.removeItem("usertoken");
        }
      });
  }, []);

  const authorized = useSelector((state) => state.user.authorized);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    dispatch(userActions.userLogout());
    navigate("/");
  };

  const Links = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Organizers", link: "/organizers" },
    { name: "Chat", link: "/chat" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="shadow-md w-full px-5">
      <div className="p-5 md:flex justify-between items-center flex-wrap">
        <div className="flex text-2xl cursor-pointer items-center gap-2">
          <div>
            <img className="w-12" src={EventosLogo} alt="" />
          </div>
          <div>
            <span className="font-bold">Eventos</span>
            <div className="text-xs grid text-gray-400">
              Making Events Simpler
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={`md:flex pl-9 md:pl-0 md:items-center absolute bg-transparent md:static md:z-auto z-[1] left-0 w-full md:w-auto transition-all duration-500 ease-in ${
            isOpen
              ? "top-10 h-[20.1rem] backdrop-filter backdrop-blur-sm mt-12 text-black bg-white"
              : "top-[-490px]"
          }`}
        >
          {Links.map((link, index) => {
            if (link.name === "Chat") {
              return authorized ? (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `font-semibold flex justify-start cursor-pointer my-10 md:my-0 md:ml-8 ${
                      isActive ? "md:border-b-2 border-blue-600" : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ) : null;
            } else {
              return (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) =>
                    `font-semibold flex justify-start cursor-pointer my-10 md:my-0 md:ml-8 ${
                      isActive ? "md:border-b-2 border-blue-600  " : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            }
          })}

          <li className="">
            {authorized ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 "
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="h-9 w-9 rounded-full" src={image} alt="" />
                  </button>
                </div>
                {/*
                 Dropdown menu, show/hide based on menu state.
           
                 Entering: "transition ease-out duration-100"
                   From: "transform opacity-0 scale-95"
                   To: "transform opacity-100 scale-100"
                 Leaving: "transition ease-in duration-75"
                   From: "transform opacity-100 scale-100"
                   To: "transform opacity-0 scale-95"
               */}
                {isDropdownOpen && (
                  <div
                    className="absolute   right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {/* Active: "bg-gray-100", Not Active: "" */}
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-0"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to={"/booked-events"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-1"
                    >
                      Booked Events
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full  py-2 text-sm text-gray-700 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setModal(!modal)}>
                <li className="font-semibold cursor-pointer my-7 md:my-0 md:ml-8 text-blue-500 opacity-100 ">
                  Log in
                </li>
              </button>
            )}
          </li>
        </ul>
      </div>

      {modal && (
        <div className={`flex justify-center   `}>
          <div className="rounded-lg p-6 ">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Choose</h2>
              <div className="flex flex-col md:flex-row justify-center items-center">
                <Link
                  to={"/organizer/"}
                  className="flex justify-center items-center mx-5 my-5"
                >
                  <Card className="w-96">
                    <CardHeader
                      floated={false}
                      className="h-96 flex justify-center items-center"
                    >
                      <img src="/eventOrganizer.jpg" alt="" />
                    </CardHeader>
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="mb-2 flex justify-center"
                    >
                      Event Organizer
                    </Typography>
                  </Card>
                </Link>
                <Link
                  to={"/signin "}
                  className="flex justify-center items-center mx-5 my-5"
                >
                  <Card className="w-96">
                    <CardHeader
                      floated={false}
                      className="h-96 flex justify-center items-center"
                    >
                      <img src="/client.jpg" alt="" />
                    </CardHeader>
                    <Typography
                      variant="h4"
                      color="blue-gray"
                      className="mb-2 flex justify-center"
                    >
                      Client
                    </Typography>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

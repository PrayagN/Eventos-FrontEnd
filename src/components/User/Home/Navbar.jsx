import React, { useEffect, useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import EventosLogo from "../../../assets/EventosLogo.png";
import { userAuth } from "../../../Services/userApi";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../app/userSlice";
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
          {
            response.data.userData.image &&
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

  let Links = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "Organizers", link: "/organizers" },
    { name: "Chat", link: "/chat" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="shadow-md w-full  ">
      <div className="p-5  md:flex justify-between items-center flex-wrap">
        <div className="flex text-2xl cursor-pointer items-center gap-2">
          <div>
            <img
              className="w-12    "
              src={EventosLogo}
              alt=""
            />{" "}
          </div>
          <div>
            <span className="font-bold ">Eventos</span>
            <div className="  ">
              <span className="text-xs grid text-gray-400">
                Making Events Simpler
              </span>
            </div>
          </div>
          <br />
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden "
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        <ul
          className={` md:flex pl-9 md:pl-0      md:items-center    absolute bg-transparent  md:static  md:z-auto z-[1] left-0 w-full md:w-auto   transition-all duration-500 ease in ${
            isOpen
              ? "top-12 backdrop-filter backdrop-blur-sm mt-12 text-white "
              : "top-[-490px]  "
          }`}
        >
          {Links.map((link, index) => {
            if (link.name === "Chat") {
              return authorized ? (
                <li
                  key={index}
                  className="font-semibold flex justify-start cursor-pointer my-10 md:my-0 md:ml-8"
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ) : null;
            } else {
              return (
                <li
                  key={index}
                  className="font-semibold flex justify-start cursor-pointer my-10 md:my-0 md:ml-8"
                >
                  <Link to={link.link}>{link.name}</Link>
                </li>
              );
            }
          })}

          <li className="ml-5">
            {authorized ? (
              <nav className="flex justify-between items-center  py-4 px-6">
                <ul className="flex">
                  <li className="relative">
                    <button
                      className="dropdown-button focus:outline-none"
                      onClick={toggleDropdown}
                    >
                      <img
                        src={image}
                        className="w-10 rounded-lg flex justify-center"
                        alt=""
                      />
                      {isDropdownOpen && (
                        <div>
                          <ul className="dropdown-menu   absolute mt-2 bg-white border border-gray-200 shadow-lg z-[9999] ">
                            <li>
                              <Link
                                to={"/profile"}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer opacity-100"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/booked-events"}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer opacity-100"
                              >
                                Booked Events
                              </Link>
                            </li>
                            <li>
                              <button
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            ) : (
              <button onClick={() => setModal(true)}>
                <li className="font-semibold cursor-pointer my-7 md:my-0 md:ml-8 text-blue-500 opacity-100">
                  Log in
                </li>
              </button>
            )}
          </li>
        </ul>
      </div>

      {modal && (
        <div className="flex inset-0 justify-center items-center h-screen md:flex-col ">
          {" "}
          <div className="rounded-lg p-6">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Choose</h2>
              <div className="flex flex-col md:flex-row justify-center items-center">
                <Link
                  to={"/organizer/"}
                  className="flex justify-center items-center mx-5 my-5 "
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

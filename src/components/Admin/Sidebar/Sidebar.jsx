import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { SiEventstore } from "react-icons/si";
import { VscOrganization } from "react-icons/vsc";
import { BiLogOutCircle } from "react-icons/bi";
import EventosLogo from "../../../assets/EventosLogo.png";
import { useDispatch } from "react-redux";
import { sidebarAction } from "../../../app/sidebarSlice";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FcAcceptDatabase } from "react-icons/fc";

function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const menu = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
    { name: "Customers", link: "/admin/customers", icon: IoIosPeople },
    {
      name: "Events",
      link: "/admin/events",
      icon: SiEventstore,
      submenu: true,
      submenuItems: [
        { name: "Booked Events", icon: FcAcceptDatabase, link: "/admin/events/bookedevents" },
      ],
    },
    { name: "Organizers", link: "/admin/organizers", icon: VscOrganization },
    {
      name: "Logout",
      link: "/admin/",
      icon: BiLogOutCircle,
      margin: true,
    },
  ];

  const [active, setActive] = useState("");
  const [open, setOpen] = useState(true);
  const [submenu, setSubmenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  dispatch(sidebarAction.setOpen(open));
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    const active = menu.find((item) => item.link === currentPath);
    setActive(active?.name || "");

    const activeSubmenuItem = menu.find(
      (item) => item.submenu && item.submenuItems.some((subItem) => subItem.link === currentPath)
    );
    setActiveSubmenu(activeSubmenuItem?.name || null);
  }, [location.pathname, menu]);

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    navigate("/admin");
    setActiveSubmenu(null);
  };

  return (
    <div className="flex min-h-screen md:flex-row shadow-lg shadow-gray-600 bg-white ">
      <div className={`bg-white ${open ? "w-72" : "w-16"} duration-500 text-black px-4 `}>
        <div className="py-3 flex justify-between ">
          <div className={`${open ? "block" : "hidden"} flex pr-32 text-black text-xl font-bold gap-2`}>
            <img src={EventosLogo} className="w-7" alt="" />
            <h1>Eventos</h1>
          </div>
          {open ? (
            <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
          ) : (
            <img
              src={EventosLogo}
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <p
          className={`text-gray-900 font-semibold text-lg m-3 ${open ? "block" : "hidden"} text-[#1976d2] `}
        >
          Welcome Admin🫡
        </p>

        <div className="mt-20 flex flex-col gap-4 relative">
          {menu?.map((menuItem, index) => (
            <div key={index}>
              {menuItem.name === "Logout" ? (
                <Link
                  to={menuItem.link}
                  onClick={handleLogout}
                  className={`${
                    (menuItem.margin && "mt-10  ") || (menuItem.size && "text-xl")
                  } group flex items-center text-sm gap-3.5 font-medium p-2 hover:text-[#1976d2] ${
                    active === menuItem.name ? "bg-slate-100 rounded-lg translate-x-2" : ""
                  }`}
                >
                  <div>
                    {React.createElement(menuItem.icon, { size: "20" })}
                  </div>
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                    }`}
                  >
                    {menuItem.name}
                  </h2>
                  {menuItem.submenu && (
                    <AiOutlineCaretDown
                      className={`${submenu ? "rotate-360" : "rotate-180"} ml-32`}
                      onClick={() => setSubmenu(!submenu)}
                    />
                  )}
                </Link>
              ) : (
                <div>
                  <Link
                    to={menuItem.link}
                    className={`${
                      (menuItem.margin && "mt-10  ") || (menuItem.size && "text-xl")
                    } group flex items-center text-sm gap-3.5 font-medium p-2 hover:text-[#1976d2] ${
                      active === menuItem.name ? "bg-slate-100 rounded-lg translate-x-2" : ""
                    }`}
                  >
                    <div>{React.createElement(menuItem.icon, { size: "20" })}</div>
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                      }`}
                    >
                      {menuItem.name}
                    </h2>
                    {menuItem.submenu && (
                      <AiOutlineCaretDown
                        className={`${submenu ? "rotate-360" : "rotate-180"} ml-32`}
                        onClick={() => setSubmenu(!submenu)}
                      />
                    )}
                  </Link>
                  {submenu && menuItem.submenu && (
                    <div className="pl-8">
                      {menuItem.submenuItems.map((submenuItem, index) => (
                        <Link
                          key={index}
                          to={submenuItem.link}
                          className={`${
                            (submenuItem.margin && "mt-4  ") || (submenuItem.size && "text-lg")
                          } group flex items-center text-sm gap-3.5 font-medium p-2 hover:text-[#1976d2] ${
                            activeSubmenu === submenuItem.name ? "bg-slate-100 rounded-lg translate-x-2" : ""
                          }`}
                        >
                          <div>{React.createElement(submenuItem.icon, { size: "20" })}</div>
                          <h2>{submenuItem.name}</h2>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

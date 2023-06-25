import { minWidth } from "@mui/system";
import React, { useState,useEffect } from "react";
import {BiLeftArrowAlt} from 'react-icons/bi'
function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [backButton,setBackButton]= useState(false)

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(screenWidth);
  return (
    <div className="w-full m-2">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
       { <div className={`border-r border-gray-300 lg:col-span-1 md:block ${backButton ?'block':screenWidth < 1021 ? "hidden" : "block"}`}>
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required=""
              />
            </div>
          </div>
          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              <a
                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                  selectedChat === 1 ? "bg-gray-100" : "hover:bg-gray-100"
                } focus:outline-none`}
                onClick={() => handleChatClick(1)}
              >
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      Jhon Don
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      25 minutes
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-gray-600">bye</span>
                </div>
              </a>
              <a
                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                  selectedChat === 2 ? "bg-gray-100" : "hover:bg-gray-100"
                } focus:outline-none`}
                onClick={() => handleChatClick(2)}
              >
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      Same
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      50 minutes
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-gray-600">
                    Good night
                  </span>
                </div>
              </a>
              <a
                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                  selectedChat === 3 ? "bg-gray-100" : "hover:bg-gray-100"
                } focus:outline-none`}
                onClick={() => handleChatClick(3)}
              >
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-gray-600">
                      Emma
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      6 hour
                    </span>
                  </div>
                  <span className="block ml-2 text-sm text-gray-600">
                    Good Morning
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>}
        {<div className="lg:col-span-2 lg:block">
          {selectedChat ? (
              <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <BiLeftArrowAlt className="w-7 h-7 md:hidden sm:block" onClick={()=>setBackButton(true)}/>
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={
                    selectedChat === 1
                      ? "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                      : selectedChat === 2
                      ? "https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                      : "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  }
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">
                  {selectedChat === 1
                    ? "Jhon Don"
                    : selectedChat === 2
                    ? "Same"
                    : "Emma"}
                </span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[38rem]">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">Hi</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">How are you?</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">I'm good. How about you?</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">I'm doing great!</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">That's good to hear!</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">
                        Do you want to grab some lunch later?
                      </span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">
                        Sure, where do you want to go?
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-between w-full  p-3 border-t border-gray-300">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-5 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required=""
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[40rem]">
            <div className="flex flex-col items-center">
              <img
                src="https://www.eduhealthsystem.com/wp-content/uploads/2021/06/eduhealth_chatbot.gif"
                className=""
                alt=""
              />
              <span className="text-gray-400 mt-4">Select a chat to start messaging</span>
            </div>
          </div>
          
          )}
        </div>}
      </div>
    </div>
  );
}

export default Chat;

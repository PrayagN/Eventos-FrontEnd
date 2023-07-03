import { minWidth } from "@mui/system";
import React, { useState, useEffect ,useRef } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TimeAgo from "timeago-react";
import {io} from 'socket.io-client'
import {
  getConnections,
  getMessages,
  sendMessage,
} from "../../../Services/userApi";
import { toast } from "react-hot-toast";
import moment from 'moment-timezone';
import jwt from "jwt-decode";

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [backButton, setBackButton] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connections, setConnections] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [search,setSearch] = useState('')

  const socket = useRef()
  const scrollRef = useRef();
  const  handleChatClick = (connection) => {
    setSelectedChat(connection);
  };
let userId ;
    const token = localStorage.getItem("usertoken");
    console.log(token,'sdfasdf');
    if(token){

      const decodedToken = jwt(token)
      userId = decodedToken ? decodedToken.id:null
    }

  useEffect(() => {
    getConnections()
      .then((response) => {
        setConnections(response.data.connections);
        // setUser(response.data.user_id)

      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  const senderId = userId;
 const indianTime=(time)=>{
    return moment(time).tz('Asia/Kolkata').format(' hh:mm A');
  }
  //connecting to socket
  useEffect(() => {
   socket.current = io(import.meta.env.VITE_UserBaseUrl);
   socket.current.emit('add-user',senderId)
  }, [senderId]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  //duplicate sender isd
  
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

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((element) => codeArray.push("0x" + element));
    let emoji = String.fromCodePoint(...codeArray);
    setNewMessage(newMessage + emoji);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (data) => {
        setArrivalMessage({
          senderId: data.senderId,
          content: data.content,
          createdAt: Date.now(),
        });
      });
    }
  }, []);
  
  useEffect(() => {
    if (arrivalMessage && selectedChat?.members.organizer._id === arrivalMessage.senderId) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, selectedChat]);
  
  const submitChat = () => {
    if (newMessage.trim() === '') {
      return toast.error('Please write a message');
    }
  
    const message = {
      content: newMessage,
      connection_id: selectedChat._id,
      senderId: senderId,
    };
    const receiverId = selectedChat.members.organizer._id;
  
    socket.current.emit('send-msg', {
      senderId: senderId,
      receiverId: receiverId,
      content: newMessage,
    });
  
    try {
      sendMessage(message).then((response) => {
        setMessages((prev) => [...prev, response.data]);
        setNewMessage('');
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    setShowEmoji(false);
  };
  
  
 

  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat?._id).then((response) => {
        setMessages(response.data);
        console.log(response.data);
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // ️ call submit function here
      submitChat();
    }
  };


  return (
    <div className="w-full ">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-2 sm:grid-cols-1 sm:h-full">
        {
          <div
            className={`border-r border-gray-300 lg:col-span-1 md:block sm:${
              backButton || selectedChat == false ? "block" : "hidden"
            }  ${selectedChat ? "hidden" : "block"}`}
          >
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
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
              </div>
            </div>
            <ul className="overflow-auto h-auto">
              {connections.length > 0 && (
                <>
                  <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">
                    Chats
                  </h2>
                  {connections.map((connection, index) => (
                    <li key={index}>
                      <a
                        className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                          selectedChat === connection._id
                            ? "bg-gray-100"
                            : "hover:bg-gray-100"
                        } focus:outline-none`}
                        onClick={() => handleChatClick(connection)}
                      >
                        <img
                          className="object-cover w-10 h-10 rounded-full"
                          src={connection.members.organizer.logo}
                          alt={connection.members.organizer.organizerName}
                        />
                        <div className="w-full pb-2">
                          <div className="flex justify-between">
                            <span className="block ml-2 font-semibold text-gray-600">
                              {connection.members.organizer.organizerName}
                            </span>
                            <span className="block ml-2 text-sm text-gray-600">
                            {indianTime(connection.updatedAt)}
                            </span>
                          </div>
                          <span className="block ml-2 text-sm text-gray-600">
                            {connection.lastMessage?.content}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        }
        {
          <div
            className={`lg:block sm:grid-cols-1  ${
              screenWidth < 1025 && selectedChat == false ? "hidden" : "block"
            }`}
          >
            {selectedChat ? (
              <div className="w-full">
                <div className="relative flex items-center p-3 border-b border-gray-300">
                  <BiLeftArrowAlt
                    className="w-7 h-7 md:hidden sm:block"
                    onClick={() => setBackButton(true)}
                  />
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={selectedChat.members.organizer.logo}
                    alt="username"
                  />
                  <span className="block ml-2 font-bold text-gray-600">
                    {selectedChat.members.organizer.organizerName}
                  </span>
                  <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                </div>
                <div className="relative w-full p-6 overflow-y-auto h-[30rem]">
                  <ul className="space-y-2">
                    {messages.map((message, index) => (
                      <li ref={scrollRef}
                        key={index}
                        className={`flex justify-${
                          message.senderId ===senderId
                            ? "end"
                            : "start"
                        }`}
                      >
                        <div
                          className={`relative max-w-xl px-4 py-2 text-gray-700 ${
                            message.sentBy === "user"
                              ? "bg-gray-100"
                              : "rounded"
                          } shadow`}
                        >
                          <span className="block">{message.content}</span>
                          <div className="text-xs text-gray-500">
                            <TimeAgo datetime={message.createdAt}></TimeAgo>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between w-full  p-3 border-t border-gray-300">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-yellow-300 animate-pulse"
                  >
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={keyDownHandler}
                  />
                  {/* <button>
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
                  </button> */}
                  <button type="submit" onClick={submitChat}  >
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
                {showEmoji && (
                  <div className="fixed bottom-28 flex justify-center">
                    <Picker  
                      data={data}
                      emojiSize={20}
                      emojiButtonSize={28}
                      maxRows={3} // Specify the number of rows you want to display
                      onEmojiSelect={addEmoji}
                      theme="light"
                      previewPosition='none'
                      maxFrequentRows={0}
                      // onClickOutside={()=>setShowEmoji(!showEmoji)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[40rem]">
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.eduhealthsystem.com/wp-content/uploads/2021/06/eduhealth_chatbot.gif"
                    className="w-64 h-64"
                    alt=""
                  />
                  <span className="text-gray-400 mt-4">
                    Select a chat to start messaging
                  </span>
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default Chat;

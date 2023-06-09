import React, { useEffect, useRef, useState } from "react";
import Gallery from "../../User/Home/Gallery";
import img5 from "../../../assets/gallery/img5.webp";
import { Link, useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import {
  addEvents,
  eventsLoad,
  eventPhotos,
} from "../../../Services/adminApi.js";
import toast, { Toaster } from "react-hot-toast";
import { photosAPI } from "../../../Services/photosApi";
import AdminLogo from "../../common/AdminLogo";
function Events() {
  const inputRef = useRef(null);
  const [addevents, setAddevents] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const handleImage = (event) => {
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsLoad();
        console.log(response.data.events);
        if (response.data.events) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);

    try {
      const response = await addEvents(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status) {
        toast.success(response.data.message);
        setAddevents(false);
        navigate("/admin/events");
        const updatedEventsResponse = await eventsLoad();

        if (updatedEventsResponse.data.events) {
          
          setEvents(updatedEventsResponse.data.events);
          setTitle("");
          setImage(null);
          setPreviewImage("");
        
      } else {
        toast.error(response.data.message);
      }
      } else if (response.status == false) {
        toast.error(response.message);
      }
      // Handle the response if needed
      console.log(response);
    } catch (error) {
      // Handle the error if needed
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <AdminLogo/>
      <h1 className="m-12 text-4xl font-semibold font-arim">Events</h1>

      <div className="flex justify-end mx-6 gap-3">
        <button
          className="rounded p-2 bg-blue-500 text-white"
          onClick={() => setAddevents(true)}
        >
          Add Events
        </button>
      </div>
      <div className="relative mx-3 ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2   pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for events"
              
                onKeyUp={(e) => setSearchValue(e.target.value)}
              />
            </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        {events.map((event) => (
          <Gallery
            key={event._id}
            Image={`${photosAPI}eventsPhotos/${event.image}`}
            title={event.title}
          />
        ))}
      </div>

      {addevents && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="relative flex flex-col items-center bg-gray-50">
            <button
              className="place-self-end mx-2 my-2 text-red-600"
              onClick={() => {
                setAddevents(false);
                setPreviewImage("");
                setImage(null);
                setTitle("");
              }}
            >
              <ImCross />
            </button>
            <div className="bg-black opacity-60 inset-0 z-0" />
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                  Event Upload!
                </h2>
              </div>
              <form className="mt-8 space-y-3" onSubmit={onFormSubmit}>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Title
                  </label>
                  <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Event name"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Attach Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center">
                        {previewImage ? (
                          <img className="" src={previewImage} alt="" />
                        ) : (
                          <img
                            className="h-36 object-center"
                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                            alt=""
                          />
                        )}
                        {!previewImage && (
                          <p className="pointer-none text-gray-500">
                            <span className="text-sm">Drag and drop</span> files
                            here <br /> or{" "}
                            <a className="text-blue-600 hover:underline">
                              select a file
                            </a>{" "}
                            from your computer
                          </p>
                        )}
                      </div>
                      <input
                        type="file"
                        name="image"
                        ref={inputRef}
                        className="hidden"
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </div>
  );
}

export default Events;

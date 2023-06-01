import React, { useState } from "react";
import Gallery from "../../User/Home/Gallery";
import img5 from "../../../assets/gallery/img5.webp";
import { Link } from "react-router-dom";
import {ImCross} from 'react-icons/im'
function Events() {
  const [addevents, setAddevents] = useState(false);
  return (
    <div className="w-full relative  ">
      <div className="flex justify-end ">
        <div className="rounded-full w-12  m-2 ">
          <img
            className="rounded-full"
            src="https://i0.wp.com/hoyenapple.com/wp-content/uploads/2022/10/como-crear-o-editar-un-memoji.jpg?fit=2000%2C1200&ssl=1"
            alt=""
          />
        </div>
      </div>
      <h1 className="m-12 text-4xl font-semibold font-arim">Events</h1>
      {/* <Link>  */}
      <div className="flex justify-end mx-6 gap-3 ">
        <button
          className="rounded p-2  bg-blue-500  text-white"
          onClick={() => setAddevents(true)}
        >
          Add Events
        </button>
      </div>
      {/* </Link>  */}

      {/* <div className="shadow-lg shadow-gray-600 h-auto  rounded-lg mx-6"> */}
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        <Gallery Image={img5} title="Wedding" />
        <Gallery Image={img5} title="Wedding" />
        <Gallery Image={img5} title="Wedding" />
      </div>

      {addevents ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="relative  flex flex-col items-center bg-gray-50">
          <button className="place-self-end mx-2 my-2 text-red-600 " onClick={()=>setAddevents(false)}>{<ImCross/>}</button>
            <div className=" bg-black opacity-60 inset-0 z-0" />
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
              <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                  Event Upload!
                </h2>
                {/* <p className="mt-2 text-sm text-gray-400">
                  Lorem ipsum is placeholder text.
                </p> */}
              </div>
              <form className="mt-8 space-y-3" action="#" method="POST">
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Title
                  </label>
                  <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type=""
                    placeholder="Event name"
                  />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Attach Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        {/*-<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>*/}
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                          <img
                            className="has-mask h-36 object-center"
                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                            alt="freepik image"
                          />
                        </div>
                        <p className="pointer-none text-gray-500 ">
                          <span className="text-sm">Drag and drop</span> files
                          here <br /> or{" "}
                          <a
                            href=""
                            id=""
                            className="text-blue-600 hover:underline"
                          >
                            select a file
                          </a>{" "}
                          from your computer
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
               
                <div>
                  <button
                    type="submit"
                    className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n\t.has-mask {\n\t\tposition: absolute;\n\t\tclip: rect(10px, 150px, 130px, 10px);\n\t}\n",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Events;

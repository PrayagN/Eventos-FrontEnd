import React from 'react'
import { useNavigate } from 'react-router-dom';
function Client404() {
    const navigate = useNavigate()
    return (
      <main className="min-h-screen max-w-screen-2xl mx-auto w-full flex flex-col justify-center items-center bg-slate-300">
        <h1 className="text-9xl font-extrabold text-black tracking-widest">
          404
        </h1>
        <div className="bg-[#ff1d1d] px-2 text-white text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#ff1d1d] group-hover:translate-y-0 group-hover:translate-x-0"></span>
  
            <span
              className="relative block px-8 py-3 bg-[#1A2238] border border-current"
              onClick={() => navigate("/")}
            >
              Go Home
            </span>
          </a>
        </button>
      </main>
    );
}

export default Client404

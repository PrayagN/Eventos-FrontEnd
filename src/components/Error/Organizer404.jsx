import React from 'react'
import { useNavigate } from 'react-router-dom';
import NotFound from '../../assets/gallery/404pageAdmin.gif'
function Organizer404() {
    const navigate = useNavigate()
    return (
      <main className="min-h-screen max-w-screen-2xl mx-auto w-full flex flex-col justify-center items-center bg-gray-50">
       <div>
        <img src={NotFound} alt="" />
       </div>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-white group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#ff1d1d] group-hover:translate-y-0 group-hover:translate-x-0"></span>
  
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current" onClick={()=>navigate('/admin/dashboard')}>
          Go Home
            </span>
          </a>
        </button>
      </main>
    );
}

export default Organizer404

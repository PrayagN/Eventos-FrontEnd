import React from 'react';

function SmallCard({count,path,name}) {
  return (
    <div className='flex flex-wrap  '>
      <div className="bg-white h-auto m-4 md:m-12 rounded-xl grid shadow-lg shadow-gray-600">
        <div className="flex justify-center items-center text-5xl gap-5">

          <div className="flex p-9 items-center  bg-white rounded-xl shadow-xs ">
            <div className="p-3 mr-4 rounded-full dark:text-orange-100 bg-blue-500 flex ">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {path}
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-black">
                {count}
              </p>
              <p className="mb-2 text-sm font-medium  text-gray-600 dark:text-gray-400">
                {name}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SmallCard;

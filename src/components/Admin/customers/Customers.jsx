import React from "react";
import  {Link} from 'react-router-dom'
function Customers() {
  return (
    <div className="w-full">
      <div className="flex justify-end">
  <div className="rounded-full w-12  m-2">
    <img
      className="rounded-full"
      src="https://i0.wp.com/hoyenapple.com/wp-content/uploads/2022/10/como-crear-o-editar-un-memoji.jpg?fit=2000%2C1200&ssl=1"
      alt=""
    />
  </div>
</div>


      <h1 className="m-12 text-4xl font-semibold font-arim">Customers</h1>
      {/* <div className='shadow w-14 shadow-gray-600 '>
        <input type="text" placeholder='Search' />
      // </div> */}
      <div className="mt-32 mx-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-gray-600 h-auto  ">
          <div className="flex items-center justify-between pb-4 bg-white ">
            <div>
              {/* <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5  dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                Action
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button> */}
              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdownAction"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
              >
                <ul
                  className="py-1 text-sm  dark:text-gray-200"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                    >
                      Reward
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                    >
                      Promote
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100  dark:hover:text-white"
                    >
                      Activate account
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  dark:text-gray-200 dark:hover:text-white"
                  >
                    Delete User
                  </Link>
                </div>
              </div>
            </div>
            <label  className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                   
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
                    />
                    <label className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label  className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src=""
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">Neil Sims</div>
                    <div className="font-normal text-gray-500">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">React Developer</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label  className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src=""
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">Bonnie Green</div>
                    <div className="font-normal text-gray-500">
                      bonnie@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">Designer</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b  hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  dark:border-gray-600"
                    />
                    <label className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-2.jpg"
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">Jese Leos</div>
                    <div className="font-normal text-gray-500">
                      jese@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">Vue JS Developer</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </Link>
                </td>
              </tr>
              <tr className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-2"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  dark:border-gray-600"
                    />
                    <label className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-5.jpg"
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">Thomas Lean</div>
                    <div className="font-normal text-gray-500">
                      thomes@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">UI/UX Engineer</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </Link>
                </td>
              </tr>
              <tr className="bg-white  hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600  dark:border-gray-600"
                    />
                    <label  className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-4.jpg"
                    alt="Jese image"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">Leslie Livingston</div>
                    <div className="font-normal text-gray-500">
                      leslie@flowbite.com
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">SEO Specialist</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                    Offline
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;

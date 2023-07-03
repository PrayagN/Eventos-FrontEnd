import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCustomers } from "../../../Services/adminApi";
import AdminLogo from "../../common/AdminLogo";
import TablePagination from '../../Admin/TablePagination/TablePagination'
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activePage,setActivePage] = useState(1)
  const [totalUser, setTotalUser] = useState(0);
  const [limit, setLimit] = useState(0);
  const skip = (activePage - 1)*limit ===0?1:(activePage-1) *limit+1
  useEffect(() => {
    listCustomers(activePage,searchValue).then((response) => {
      
      setCustomers(response.data.customers);
      setTotalUser(response.data.total)
      setLimit(response.data.size)
    });
  }, [activePage,searchValue]);

  // const filteredCustomers = customers.filter((customer) =>
  //   customer.username.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <div className="w-full">
     <AdminLogo/>

      <h1 className="m-10 text-4xl font-semibold font-arim">Customers</h1>

      <div className="mt-20 mx-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg shadow-gray-600   ">
          <div className="flex items-center justify-end p-1 pb-4 bg-white ">
            <label className="sr-only">Search</label>
            <div className="relative">
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
                className="block p-2 mx-2 my-2  pl-10 text-sm text-black border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              
                onKeyUp={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-900 font-semibold">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Sl.no
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  className="bg-white border-b hover:bg-gray-50 "
                  key={customer.id}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={customer?.image ? customer.image : 'https://cliply.co/wp-content/uploads/2020/08/442008112_GLANCING_AVATAR_3D_400px.gif'}
                      alt=""
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {customer.username}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      {customer.district && <span>{customer.district}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
              <div className="flex justify-end w-full mt-2 mb-2">
                
              <TablePagination activePage={activePage} setActivePage={setActivePage} total={totalUser} limit={limit}/>
              </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;

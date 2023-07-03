import React, { useEffect, useState } from "react";
import dateFormat, { masks } from "dateformat";
import TablePagination from "../TablePagination/TablePagination";

import { BookedEventsData } from "../../../Services/adminApi";
function BookedEvents() {
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [totalBooking, setTotalBooking] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(0);
  const skip =
    (activePage - 1) * limit === 0 ? 1 : (activePage - 1) * limit + 1;

  useEffect(() => {
    BookedEventsData(activePage,searchQuery).then((response) => {
      setData(response.data.necessaryData);
      setTotalBooking(response.data.total)
      setLimit(response.data.size)

    });
  }, [activePage,searchQuery]);

  const dateformat = (date) => {
    return dateFormat(date, "dd/mm/yyyy");
  };

  return (
    <div className="w-full  ">
      <div className="m-10   mt-12">
        <h1 className="text-4xl font-semibold font-arim ">Booked Clients</h1>
      </div>
      <div className=" px-10 mt-32">
        <div className="flex justify-end">
          <div
            className="relative mb-5  shadow-lg flex justify-end shadow-gray-600 rounded-xl "
            data-te-input-wrapper-init
          >
            <input
              type="text"
              className="peer rounded-xl min-h-[auto] w-full outline-none px-3 py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length === 0 && (
              <label className="pointer-events-none font-semibold absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-blue-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary">
                Search
              </label>
            )}
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-900 font-semibold">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Sl.no
              </th>
              <th scope="col" className="px-6 py-3">
                Organizer
              </th>
              <th scope="col" className="px-6 py-3">
                Client
              </th>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
              <th scope="col" className="px-6 py-3">
                Full Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Advance Amount
              </th>

              <th scope="col" className="px-6 py-3">
                EventScheduled
              </th>
              <th scope="col" className="px-6 py-3">
                bookedData
              </th>
              <th scope="col" className="px-6 py-3">
                PaymentStatus
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((customer, index) => (
              <tr className="bg-white border-b hover:bg-gray-50 " key={index}>
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {customer?.organizerName}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 first-letter:uppercase">
                  {customer?.clientName}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {<span>{customer.event}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">${customer?.totalAmount}</td>
                <td className="px-6 py-4">$ {customer?.advanceAmount}</td>
                <td className="px-6 py-4">
                  {dateformat(customer?.eventScheduled)}
                </td>
                <td className="px-6 py-4">
                  {dateformat(customer?.bookedData)}
                </td>
                <td
                  className={`px-6 py-4 text-white flex justify-center rounded ${
                    customer?.paymentStatus == "Refunded"
                      ? "bg-red-500"
                      : "bg-green-400"
                  }`}
                >
                  {customer?.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 justify-end my-5">
                <TablePagination activePage={activePage} setActivePage={setActivePage} total={totalBooking} limit={limit} skip={skip} />
              </div>
      </div>
    </div>
  );
}

export default BookedEvents;

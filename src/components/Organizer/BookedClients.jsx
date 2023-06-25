import React, { useEffect, useState } from "react";
import TablePagination from "../Admin/TablePagination/TablePagination";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardHeader,
  Chip,
  CardFooter,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { bookedClients, updatePayment } from "../../Services/organizerApi";
import { toast } from "react-hot-toast";
import dateFormat, { masks } from "dateformat";

function BookedClients() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalBooking, setTotalBooking] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [update, setUpdate] = useState("");
  const  bookingLimitPerPage = 1;
  const skip = (activePage - 1)*limit ===0?1:(activePage-1) *limit+1

  

  const updatePayments = (id) => {
    setShow(null);
    console.log(id);
    updatePayment(id)
      .then((response) => {
        setUpdate(true);
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    bookedClients(activePage,searchQuery)
      .then((response) => {
        console.log(response);
        setTotalBooking(response.data.total)
        setLimit(response.data.size)
        setCustomers(response.data.detail);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [update,activePage,searchQuery]);
  const TABLE_HEAD = [
    "Sl.no",
    "Client",
    "Full Amount",
    "Advance Amount",
    "Payment Status",
    "Event Scheduled",
    "Booked Date",
  ];

  const dateformat = (date) => {
    return dateFormat(date, "dd/mm/yyyy");
  };

  const toggleDropdown = (index) => {
    if (show === index) {
      setShow(null); // Close the dropdown if it's already open
    } else {
      setShow(index); // Open the dropdown for the clicked row
    }
  };
  return (
    <div className="w-full ">
      <div className="m-10   mt-12">
        <h1 className="text-4xl font-semibold font-arim ">Booked Clients</h1>
      </div>
      <div className="flex px-10 mt-32 ">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Transactions
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  These are details about all the transactions
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input placeholder="Search"  onKeyUp={(e) => setSearchQuery(e.target.value)}/>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="overflow-scroll px-0 scrollbar-hide">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-gray-100 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers?.map((customer, index) => {
                  return (
                    <tr key={index} className="">
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal flex justify-center"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3 ">
                          <Avatar
                            src={customer?.client?.image}
                            className=" object-cover rounded-full"
                            size="md"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold first-letter:uppercase"
                            >
                              {customer?.client?.username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {customer?.client?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal flex justify-center"
                          >
                            $ {customer?.totalAmount}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal flex justify-center"
                          >
                            $ {customer?.advanceAmount}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 relative">
                        <div className="flex justify-center">
                          <Chip
                            variant="ghost"
                            size="sm"
                            className={`bg-${
                              customer?.payment === "Advance Only"
                                ? "blue-500"
                                : customer?.payment === "Full paid"
                                ? "green-500"
                                : "red-500"
                            } text-white rounded-full lowercase`}
                            value={
                              customer?.payment === "Advance Only"
                                ? "Advance Only"
                                : customer?.payment === "Full paid"
                                ? "Full paid"
                                : "Refunded"
                            }
                          />

                          <div className="relative">
                            <button
                              className="inline-flex items-center p-2 text-xs font-medium text-center text-gray-900 bg-white rounded-lg  hover:animate-pulse"
                              type="button"
                              onClick={() => toggleDropdown(index)}
                            >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            {show === index && (
                              <div className="absolute top-full  text-black  rounded-lg shadow w-24 h-8 mt-2 bg-green-500">
                                <ul className=" ml-2  text-sm text-gray-700 dark:text-gray-200">
                                  <li
                                    onClick={() =>
                                      updatePayments(customer?._id)
                                    }
                                  >
                                    <a className="block px-4 py-1 text-white ">
                                      Full paid
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {dateformat(customer?.eventScheduled)}
                          </Typography>
                        </td>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {dateformat(customer?.bookedDate)}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
              <div className="flex gap-2">
                <TablePagination activePage={activePage} setActivePage={setActivePage} total={totalBooking} limit={limit} skip={skip} />
              </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default BookedClients;

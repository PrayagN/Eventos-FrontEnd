import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { bookedClients } from "../../Services/organizerApi";
import { toast } from "react-hot-toast";
import dateFormat, { masks } from "dateformat";

function BookedClients() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    bookedClients()
      .then((response) => {
        console.log(response.data.detail);
        setCustomers(response.data.detail);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  console.log(customers[0]?.client);

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

  return (
    <div className="w-full ">
      <div className="m-10   mt-12">
        <h1 className="text-4xl font-semibold font-arim ">Booked Clients</h1>
      </div>
      <div className="flex px-10 mt-32 ">
        <Card className="h-full w-full">
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
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex justify-center">
                          <Chip
                            variant="ghost"
                            size="sm"
                            className={`bg-${
                              customer?.payment === "Advance Only"
                                ? "green-500"
                                : "blue-gray-500"
                            } text-white rounded-full   lowercase`}
                            value={
                              customer?.payment === "Advance Only"
                                ? "Advance Only"
                                : "Full Paid"
                            }
                          />
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
              <Button variant="outlined" color="blue-gray" size="sm">
                Previous
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default BookedClients;

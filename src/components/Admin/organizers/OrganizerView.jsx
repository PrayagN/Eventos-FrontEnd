import React, { useEffect, useState } from "react";
import { AcceptOrganizer, viewOrganizer } from "../../../Services/adminApi";
import AdminLogo from "../../common/AdminLogo";
import { useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

function OrganizerView() {
  const [organizer, setOrganizer] = useState({});
  const [isAccepted, setIsAccepted] = useState();
  const location = useLocation();
  const organizer_id = location?.state.id;
  console.log(isAccepted);
  useEffect(() => {
    if (organizer_id) {
      viewOrganizer(organizer_id).then((response) => {
        if (response.data.organizer) {
          setOrganizer(response.data.organizer);
          const status = response.data.organizer.status
          setIsAccepted(status);
        } else {
          toast.error(response.data.message);
        }
      });
    }
  }, [organizer_id,isAccepted]);

  const handleButton = () => {
    AcceptOrganizer(organizer_id).then((response) => {
      if (response.data.status) {
        setIsAccepted(true);
        toast.success("accepted the Organizer");
      } else if (response.data.statuses) {
        setIsAccepted(false);
        toast.error("rejected the Organizer");
      }
    });
  };

  return (
    <div className="w-full mx-3">
      <div className="w-full">
        <AdminLogo />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/6">
          <Card className="mt-6">
            <div className="flex justify-center">
              <CardHeader color="blue-gray" className="relative w-32">
                <img src={organizer.logo} alt="" />
              </CardHeader>
            </div>
            <CardBody>
              <div className="flex justify-center">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 font-bold"
                >
                  {organizer.organizerName}
                </Typography>
              </div>
              <Typography>{organizer.description}</Typography>
            </CardBody>
            <div className="flex justify-center gap-20 m-5">
              <button
                onClick={handleButton}
                className={`relative inline-flex items-center justify-start px-4 py-1 overflow-hidden font-medium transition-all rounded-full ${
                  isAccepted ==='true' ? "bg-red-600" : "bg-green-700"
                } group-hover:bg-white group`}
              >
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span
                  className={`relative w-full text-left ${
                    isAccepted ==='true' ? "text-white group-hover:text-red-600" : "text-white group-hover:text-green-600"
                  } transition-colors duration-200 ease-in-out  `}
                >
                  {isAccepted ==='true' ? "Reject" : "Accept"}
                </span>
              </button>
              {/* <button onClick={handleButton}>
                {isAccepted ==='true' ? 'Reject':'Accept'}
              </button> */}
            </div>
          </Card>
        </div>
        <div className="w-full md:w-4/6">
          <Card className="p-2">
            <div className="flex flex-col w-72 gap-6">
              <div className="flex gap-40">
                <label>
                  OrganizerName
                  <Input
                    variant="static"
                    style={{ width: "80px", fontWeight: "bold" }}
                    value={organizer.organizerName}
                  />
                </label>
                <label>
                  Email
                  <Input
                    variant="static"
                    style={{ width: "80px", fontWeight: "bold" }}
                    value={organizer.email}
                  />
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default OrganizerView;

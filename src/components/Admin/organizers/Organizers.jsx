import React, { useEffect, useState } from "react";
import { listOrganizers } from "../../../Services/adminApi";
import Card from "./Card";
import AdminLogo from "../../common/AdminLogo";

function Organizers() {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    listOrganizers().then((response) => {
      setOrganizers(response.data.organizers);
    });
  }, []);
  // console.log(org);
  return (
    <div className="w-full mb-4 ">
      <AdminLogo />
      <h1 className="m-12 text-4xl font-semibold font-arim">Organizers</h1>
      <div className="grid xl:grid-cols-3 text-sm  md:grid-cols-4 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        {organizers?.map((organizer, index) => (
          <Card
            key={index}
            title={organizer.organizerName}
            description={organizer.description}
            img={organizer.logo}
            id={organizer._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Organizers;

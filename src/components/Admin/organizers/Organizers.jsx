import React, { useEffect, useState } from "react";
import { listOrganizers } from "../../../Services/adminApi";
import Card from "./Card";

function Organizers() {
  const [organizers, setOrganizers] = useState([]);
 
  useEffect(() => {
   
       listOrganizers().then((response)=>{

         console.log(response.data.organizers);
         setOrganizers(response.data.organizers);
       })
    
    
  }, []);
  // console.log(org);
  return (
    <div className="w-full mb-4 ">
      <div className="flex justify-end ">
        <dq iv className="rounded-full w-12  m-2 ">
          <img
            className="rounded-full"
            src="https://i0.wp.com/hoyenapple.com/wp-content/uploads/2022/10/como-crear-o-editar-un-memoji.jpg?fit=2000%2C1200&ssl=1"
            alt=""
          />
        </dq>
      </div>
      <h1 className="m-12 text-4xl font-semibold font-arim">Organizers</h1>
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid mt-12 my-4 mx-8 gap-6 p-4 pt-3 rounded-lg shadow shadow-gray-600">
        {organizers?.map((organizer, index) => (
          <Card
          key={index}
            title={organizer.organizerName}
            description={organizer.description}
            organizer={true}
            id ={organizers._id}
          />
        ))}

      </div>
         
    </div>
  );
}

export default Organizers;

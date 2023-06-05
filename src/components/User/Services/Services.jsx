import React from 'react';
import Header from '../Header/Header';
import Gallery from '../Home/Gallery';
import img1 from '../../../assets/gallery/img1.jpg';
import { eventList } from '../../../Services/userApi';
import { useEffect, useState } from 'react';
import { photosAPI } from '../../../Services/photosApi';
function Services() {
  const [eventlist, setEventList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await eventList();
        setEventList(response.data.events);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header title="Services" />
      <div className="grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-12 pt-1 mx-10 gap-10">
        {eventlist.map((event, index) => (
          <Gallery key={index} Image={`${photosAPI}eventsPhotos/${event.image}`} title={event.title} />
        ))}
      </div>
    </div>
  );
}

export default Services;

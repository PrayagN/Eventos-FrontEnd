import React, { useEffect } from "react";
import img2 from "../../assets/gallery/img2.jpg";
import Card from "../Admin/organizers/Card";
import Posts from "./Posts";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { organizerProfile, updateProfile } from "../../Services/organizerApi";
import toast, { Toaster } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  organizerName: Yup.string().required("Organizer Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.number().required("Mobile is required"),
  venue: Yup.string().required("Venue is required"),
  budget: Yup.number().required("Budget is required"),
  capacity: Yup.string().required("Capacity is required"),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
});

function Profile() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await organizerProfile();
        const organizerData = response.data.profile[0];
        formik.setValues(organizerData); 
        console.log(organizerData);// Set initial values with the fetched data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      organizerName: "",
      email: "",
      mobile: "",
      venue: "",
      budget: "",
      capacity: "",
      district: "",
      state: "",
      description: '',
      logo: '',
      images: [],
      services: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const   updatedValues ={...values,services:services.join(',')}
      const response = await updateProfile(updatedValues);
      if (response) {
        toast.success(response.data.message);
        console.log(response.data);
      }
    },
  });
  
  const addService = () => {
    if (formik.values.services.trim() !== "") {
      
      setServices((prevServices)=>[...prevServices,formik.values.services]);
      formik.setFieldValue('services','');
    }
  };

  return (
    <div className="grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  ">
      <div className="m-4 space-y-16">
        <h1 className="text-4xl font-semibold font-arim">Profile</h1>

        <Card title={formik.values.organizerName} size="true" event={formik.values.event} />

        <Posts className="" />
      </div>
      <div className="flex justify-end">
        <form className="mt-7 mx-20 " onSubmit={formik.handleSubmit}>

          <div className="flex  ">
            <div className="border p-4 w-96  ">
              <div className="">
                <label className="block mb-2 text-sm font-medium text-black">
                  Organizer Name
                </label>
                <input
                  type="text"
                  name="organizerName"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("organizerName")}
                  required
                />
                {formik.touched.organizerName &&
                  formik.errors.organizerName && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.organizerName}
                    </div>
                  )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("email")}
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium text-black">
                  Mobile
                </label>
                <input
                  type="number"
                  name="mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("mobile")}
                  required
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.mobile}
                  </div>
                )}
              </div>
              <div className="">
                <label className="block mb-2 text-sm font-medium text-black">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...formik.getFieldProps("venue")}
                  required
                />
                {formik.touched.venue && formik.errors.venue && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.venue}
                  </div>
                )}
              </div>
              <div className="relative mb-3 mt-2" data-te-input-wrapper-init>
                <label className="block mb-2 text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  className="peer block min-h-[auto] w-full  rounded border-2 px-3 py-[0.32rem] leading-[1.6] outline-0 transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  rows="3"
                  name="description"
                  placeholder="Your message"
                  {...formik.getFieldProps("description")}
                ></textarea>
              </div>
            </div>

            <div className="border p-4 ml-4 mt-52 w-80 ">
              <div className="flex gap-8">
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Budget
                  </label>
                  <input
                    type="number"
                    name="budget"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("budget")}
                    required
                  />
                  {formik.touched.budget && formik.errors.budget && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.budget}
                    </div>
                  )}
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("capacity")}
                    required
                  />
                  {formik.touched.capacity && formik.errors.capacity && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.capacity}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-8 ">
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-black">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("district")}
                    required
                  />
                  {formik.touched.district && formik.errors.district && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.district}
                    </div>
                  )}
                </div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-black">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...formik.getFieldProps("state")}
                    required
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.state}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex py-5 "
            // style={{ marginLeft: "500px", marginTop: "-400px" }}
          >
            <input
              type="text"
              name="services"
              value={formik.values.services}
              onChange={formik.handleChange}
              placeholder="Add Services"
            />

            <button className="" type="button" onClick={addService}>
              {" "}
              <FcPlus size={"25px"} />
            </button>
          </div>
          <ul className="flex gap-10">
            {services.map((service, index) => (
              <li key={index}>{index + 1}. {service}</li>
            ))}
          </ul>
          
          <div className="flex justify-end mt-3">
          <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Profile;

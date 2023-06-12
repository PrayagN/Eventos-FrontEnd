import React, { useEffect } from "react";
import img2 from "../../assets/gallery/img2.jpg";
import Card from "./Card";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { organizerProfile, updateProfile } from "../../Services/organizerApi";
import toast, { Toaster } from "react-hot-toast";
import { FcCameraAddon } from "react-icons/fc";
import Slide from "./Slide";

import { Button } from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [orgImages, setOrgImages] = useState([]);

  const [services, setServices] = useState([]);
  const [logo, setLogo] = useState(null);
  const [orgLogo, setOrgLogo] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg"
  );
  const [images, setImages] = useState([]);
  const validateImage = (file) => {
    const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    // Check file format
    if (!supportedFormats.includes(file.type)) {
      toast.error(
        "Unsupported image format. Please choose a JPEG, PNG, or GIF image."
      );
      return false;
    }

    // Check file size
    if (file.size > maxSizeInBytes) {
      toast.error("The image size exceeds the maximum allowed limit of 5MB.");
      return false;
    }

    return true;
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (validateImage(file)) {
        console.log(file);
        setLogo(file);
        setOrgLogo(null);
      }
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      // Validate each file
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        if (!validateImage(file)) {
          return;
        }
      }

      setImages(fileArray);
      setOrgImages([]);
    }
  };

  const [fire, setFire] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await organizerProfile();
        const organizerData = response.data.profile;
        formik.setValues(organizerData);
        setServices(organizerData.service);
        console.log(organizerData); // Set initial values with the fetched data
        setOrgImages(organizerData.images);
        if (organizerData.logo) {
          setOrgLogo(organizerData.logo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [fire]);

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
      description: "",
      servic: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      toast.loading("updating");
      try {
        let urlArray = [];
        for (let i = 0; i < images.length; i++) {
          const storageRef = ref(storage, `/organizer-posts/${images[i].name}`);
          const snapshot = await uploadBytes(storageRef, images[i]);
          const url = await getDownloadURL(snapshot.ref);

          urlArray.push(url);
        }
        values = {
          ...values,
          services,
          imageUrl: urlArray,
        };
        if (logo) {
          const storageRef = ref(storage, `/organizer-logo/` + logo?.name);
          const snapShot = await uploadBytes(storageRef, logo);
          const logoUrl = await getDownloadURL(snapShot.ref);
          values = {
            ...values,
            logoUrl: logoUrl,
          };
        }

        const response = await updateProfile(values);
        if (response) {
          toast.dismiss();
          toast.success(response.data.message);
          console.log(response.data);
          setFire(!fire);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const addService = () => {
    setServices((prevService) => [...prevService, formik.values.servic]);
    formik.setFieldValue("servic", "");
    console.log(services);
  };

  return (
    <div className="grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  ">
      <div className="m-4 space-y-16">
        <h1 className="text-4xl font-semibold font-arim">Profile</h1>

        <label className="absolute  text-white px-52   ">
          <FcCameraAddon className="w-32 cursor-pointer" />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </label>
        <Card
          title={formik.values.organizerName}
          logo={orgLogo}
          imagePreview={logo}
          size="true"
          event={formik.values.event}
        />
        <div className="w-96">
          <Slide autoSlide={true}>
            {orgImages.length > 0
              ? orgImages.map((file, index) => (
                  <img key={index} src={file} alt={file.name} />
                ))
              : images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                ))}
          </Slide>
          <div className="flex justify-center mt-3 ">
            <Button>
              <label className="flex item-center gap-3">
                <input
                  type="file"
                  id="uploadFile"
                  className="hidden "
                  multiple
                  onChange={handleFileUpload}
                />

                <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" />
                <span>Upload your recent works</span>
              </label>
            </Button>
          </div>
        </div>
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
              name="servic"
              value={formik.values.servic}
              onChange={formik.handleChange}
              placeholder="Add Services"
            />

            <button className="" type="button" onClick={addService}>
              {" "}
              <FcPlus size={"25px"} />
            </button>
          </div>

          <div style={{}}>
            {services.length > 0 ? (
              <ul className="grid lg:grid-cols-5 gap-2">
                {services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              <p>No services added yet.</p>
            )}
          </div>

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

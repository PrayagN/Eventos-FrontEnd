import React, { useEffect, useState } from "react";
import { FcVoicePresentation } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import avatar from "../../../assets/gallery/defatultProfile.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { profileGet, updateProfile } from "../../../Services/userApi";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { validateImage } from "../../../constants/constants";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  email: Yup.string().email("invalid email").required("Email is required"),
  mobile: Yup.number().required("Mobile number is required"),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
});

function Profile() {
  // const [profile, setProfile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(avatar);

  useEffect(() => {
    profileGet().then((response) => {
      if (response.data.profile) {
        formik.setValues(response.data.profile);
        // {
          response.data.profile.image &&
            setUploadedPhoto(response.data.profile.image);
        // }
      } else {
        toast.error("Something went wrong");
      }
    });
  }, []);

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(validateImage(file));
      setUploadedPhoto(null);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      district: "",
      state: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      
      toast.loading("updating");
      try {
        if (imagePreview) {
          const storageRef = ref(
            storage,
            `/user-profilePhoto` + imagePreview?.name
          );
          const snapShot = await uploadBytes(storageRef, imagePreview);
          const imageUrl = await getDownloadURL(snapShot.ref);
          values = {
            ...values,
            imageUrl: imageUrl,
          };
        }
        updateProfile(values).then((response) => {
          if (response.data.status) {
            toast.dismiss();
            toast.success(response.data.message);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row mt-20 mb-2">
      <div className="m-4  md:w-3/12 flex justify-center ">
        <Card className="  shadow-lg shadow-gray-600 flex justify-center ">
          <div className="flex justify-center items-center">

          <CardHeader floated={false} className="w-52 rounded h-52 flex justify-center object-contain">
            {imagePreview ? (
              <img src={URL.createObjectURL(imagePreview)} alt="" className="object-cover" />
              ) : (
                <img src={uploadedPhoto} className="object-cover" />
                )}
          </CardHeader>
                </div>
          <CardBody className="text-center">
            {/* <Typography variant="h4" color="blue-gray" className="mb-2"> */}
            <label className="relative text-white px-52">
              <div className="w- cursor-pointer bg-blue-600 rounded-md py-2 text-center">
                Upload Profile Photo
              </div>
              <input
                type="file"
                className="absolute top-0 left-0 opacity-0"
                accept="image/*"
                onChange={handleProfileUpload}
              />
            </label>
            {/* </Typography> */}
          </CardBody>
        </Card>
      </div>
      <div className="shadow-lg shadow-gray-600 h-auto md:w-9/12  mx-5  mt-5 p-3 rounded-lg">
        <div className="flex items-center gap-4">
          <FcVoicePresentation className="w-8 h-8" />
          <span>About</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="text-gray-700 mt-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="px-4 py-2 font-semibold w-24">Name</div>
                <input
                  className="px-2 py-2 border border-gray-300 rounded-md w-full"
                  name="username"
                  {...formik.getFieldProps("username")}
                  required
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="px-2 py-2 font-semibold w-24">Email</div>
                <input
                  name="email"
                  className="px-2 py-2 border border-gray-300 rounded-md w-full"
                  {...formik.getFieldProps("email")}
                  disabled
                />
              </div>
            </div>
            {/* <br /> */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <div className="px-4 py-2 font-semibold w-24">District</div>
                <input
                  className="px-2 py-2 border border-gray-300 rounded-md w-full"
                  name="district"
                  {...formik.getFieldProps("district")}
                />
                {formik.touched.district && formik.errors.district && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.district}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div className="px-2 py-2 font-semibold ">State</div>
                <input
                  className="px-2 py-2 ml-6  border border-gray-300 rounded-md w-full"
                  name="state"
                  {...formik.getFieldProps("state")}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.state}
                  </div>
                )}
              </div>
            </div>
            <br />
            <div className="flex items-center">
              <div className="px-4 py-2 font-semibold w-18">Phone</div>
              <input
                className="px-2 mx-2 py-2 border border-gray-300 rounded-md w-48"
                name="mobile"
                {...formik.getFieldProps("mobile")}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.mobile}
                </div>
              )}
            </div>
            
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

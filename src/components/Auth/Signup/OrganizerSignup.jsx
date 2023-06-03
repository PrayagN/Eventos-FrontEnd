import React, { useEffect, useState } from "react";
import {ImCross} from 'react-icons/im'
import axios from "axios";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase";
import Modal from "react-modal";
import { viewEvents, organizerSignup } from "../../../Services/organizerApi";
const initialValues = {
  organizerName: "",
  email: "",
  password: "",
  mobile: "",
  otp: "",
  event: "",
};
const validationSchema = Yup.object({
  organizerName: Yup.string().required("required"),
  email: Yup.string().email("invalid email format").required("required"),
  password: Yup.string().min(4).required("please enter your password"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "mobile number is not valid")
    .required("required"),
  event:Yup.string().required()
});


function OrganizerSignup() {
  const [isOTPOpen, setOTPOpen] = useState(false);
  const [verify, setVerify] = useState(null);
  const [eventOptions, setEventOptions] = useState([]);

  // const [otp,setOTP] = useState(null)


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await viewEvents();
        if (response.data.status) {
          setEventOptions(response.data.events);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchOptions();
  }, []);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values.mobile);
      const { response } = await organizerSignup(values)
        .then((response) => {
          if (response.data.status) {
            const sendOtp = async () => {
              try {
                const phoneNumber = "+91" + values.mobile;
                const appVerifier = new RecaptchaVerifier(
                  "recaptcha-container",
                  {
                    size: "normal",
                    callback: (response) => {},
                    "expired-callback": () => {},
                  },
                  auth
                );

                const confirmationResult = await signInWithPhoneNumber(
                  auth,
                  phoneNumber,
                  appVerifier
                );
                setVerify(confirmationResult);

                console.log("OTP sent:", confirmationResult);

                setOTPOpen(true);
              } catch (error) {
                console.log("Error sending OTP:", error);
              }
            };
            sendOtp();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const handleOTPVerification = async () => {
    try {
      console.log(formik.values, "dsfa");
      await verify.confirm(formik.values.otp);
      const { response } = await organizerSignup(formik.values).then(
        (response) => {
          if (response.data.status) {
            navigate("/organizer");
            setOTPOpen(false);
          }
        }
      );
    } catch (error) {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  return (
    <main className="w-full h-screen flex rounded">
      <div className="bg-white grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] rounded-2xl">
        <div className="hidden md:block">
          <img
            src="https://media.istockphoto.com/id/1430871384/vector/event-planner-template-hand-drawn-cartoon-flat-illustration-with-planning-schedule-time.jpg?s=612x612&w=0&k=20&c=Aa-8uNDJCHmiilHB5A9-VYrbUmy5GhYG4VIfEtr9hmE="
            className="mt-20 rounded-tl-2xl rounded-bl-2xl"
            alt=""
          />
        </div>
        <div className="p-4 flex flex-col justify-center">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-3xl font-bold p-5">
              Welcome to Eventos Organizers.
            </h2>
            <p className="pl-4 mb-2 text-gray-400">
              Already have an account ?{" "}
              <span className="text-blue-600">
                <Link to="/organizer/signin">Log in</Link>
              </span>
            </p>
            <div>
              <TextField
                variant="standard"
                name="organizerName"
                style={{ marginTop: "20px" }}
                className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200"
                type="text"
                label="organizerName"
                {...formik.getFieldProps("organizerName")}
              />
              {formik.touched.organizerName && formik.errors.organizerName ? (
                <div className="text-red-600 pl-2">
                  {formik.errors.organizerName}
                </div>
              ) : null}
              <TextField
                variant="standard"
                name="email"
                style={{ marginTop: "20px" }}
                className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200"
                type="text"
                label="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 pl-2">{formik.errors.email}</div>
              ) : null}
              <TextField
                variant="standard"
                name="password"
                style={{ marginTop: "20px" }}
                className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200"
                type="password"
                label="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 pl-2">
                  {formik.errors.password}
                </div>
              ) : null}
              <div className="flex">
                <TextField
                  variant="standard"
                  name="mobile"
                  style={{ marginTop: "20px" }}
                  className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200"
                  type="text"
                  label="mobile"
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="text-red-600 pl-2">
                    {formik.errors.mobile}
                  </div>
                ) : null}

                <select
                  className="text-base p-2  rounded-lg focus:outline-none focus:border-indigo-500"
                  name="event"
                  {...formik.getFieldProps("event")}
                  onChange={formik.handleChange}
                >
                  <option value="">Select an Event</option>
                  {eventOptions.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div id="recaptcha-container" className="p-2"></div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full"
              style={{ marginTop: "30px" }}
            >
              Register
            </Button>
          </form>
          {isOTPOpen && (
            <div className="w-20">
              <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold mb-4">
                      OTP Verification
                    </h2>
                    <button
                      className=" -my-4 ml-2  text-red-600 "
                      onClick={() => setOTPOpen(false)}
                    >
                      {<ImCross />}
                    </button>
                  </div>
                  <input
                    type="text"
                    name="otp"
                    {...formik.getFieldProps("otp")}
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    placeholder="Enter OTP"
                  />
                  <button
                    onClick={handleOTPVerification}
                    className="bg-blue-500 text-white rounded-md py-2 px-4 ml-3 mr-2"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
          <Toaster />
        </div>
      </div>
    </main>
  );
}

export default OrganizerSignup;

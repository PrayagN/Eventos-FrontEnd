import React, { useState } from "react";

import eMSignup from "../../../assets/Login/eMSignup.jfif";

import { useFormik } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; // Added signInWithPhoneNumber import
import { auth } from "../../../firebase";

import { ImCross } from "react-icons/im";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { userSignup } from "../../../Services/userApi";
const initialValues = {
  username: "",
  email: "",
  password: "",
  mobile: "",
  otp: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("required"),
  email: Yup.string().email("invalid email format").required("required"),
  password: Yup.string().min(4).required("please enter your password"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "mobile number is not valid")
    .required("required"),
});
function UserSignup() {
  /// Google Signup
  const responseMessage = (response) => {
    let credential = jwt_decode(response.credential);
    const values = {
      email: credential.email,
      username: credential.name,
      password: credential.sub,
      exp: credential.exp,
    };
    console.log(values);
    userSignup(values).then((response) => {
      if (response.data.status) {
        localStorage.setItem("usertoken", response.data.token);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    });
    console.log(credential);
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  /// normal
  const [isOTPOpen, setOTPOpen] = useState(false);
  const [otp, setOTP] = useState(null);
  const [verify, setVerify] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      

      const { data } = await userSignup(values);
      if (data.status) {
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
        toast.error(data.message);
      }
    },
  });
  const handleOTPVerification = async () => {
    try {
     
      await verify.confirm(formik.values.otp);
      const { data } = await userSignup(formik.values);
      if (data.status) {
        navigate("/signin");
        setOTPOpen(false);
      }
    } catch (error) {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  return (
    <main className="w-full h-screen flex rounded bg-cover">
      <div className=" bg-white grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] rounded-2xl ">
        <div className="hidden md:block">
          <img
            className=" mt-28 rounded-tl-2xl rounded-bl-2xl"
            src={eMSignup}
            alt=""
          />
        </div>
        <div className="p-4 flex flex-col  ">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-4xl font-bold p-5  ">Eventos.</h2>
            <p className="pl-4 mb-2 text-gray-400">
              Already have an account?{" "}
              <span className="text-blue-600">
                {" "}
                <Link to="/signin"> Log in </Link>{" "}
              </span>
            </p>
            <div className="">
              <input
                className="border p-2 mr-2  w-full rounded-2xl shadow-lg shadow-gray-200"
                type="text"
                placeholder="username"
                name="username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-600 pl-2">
                  {formik.errors.username}
                </div>
              ) : null}
              <input
                className="border p-2 mr-2 mt-5 w-full rounded-2xl shadow-lg shadow-gray-200"
                type="email"
                placeholder="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 pl-2">{formik.errors.email}</div>
              ) : null}
              <input
                className="border p-2 mr-2 mt-5 w-full rounded-2xl shadow-lg shadow-gray-200"
                type="password"
                placeholder="password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 pl-2">
                  {formik.errors.password}
                </div>
              ) : null}
              <input
                className="border p-2 mr-2 w-full mt-5  rounded-2xl shadow-lg shadow-gray-200"
                type="number"
                placeholder="mobile"
                name="mobile"
                {...formik.getFieldProps("mobile")}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-600 pl-2">{formik.errors.mobile}</div>
              ) : null}
            </div>
            <div id="recaptcha-container"></div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full "
              style={{ marginTop: "30px" }}
            >
              {" "}
              Register
            </Button>
          </form>

          <div className="flex justify-center my-5">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
          {/* OTP Modal */}
          {/* OTP Modal */}
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

export default UserSignup;

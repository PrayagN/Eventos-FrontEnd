import React, { useState } from "react";
import { organizerAPI } from "../../../Api";
import axios from "axios";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase";
import Modal from 'react-modal'
const initialValues = {
  organizerName: "",
  email: "",
  password: "",
  mobile: "",
};
const validationSchema = Yup.object({
  organizerName: Yup.string().required("required"),
  email: Yup.string().email("invalid email format").required("required"),
  password: Yup.string().min(4).required("please enter your password"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "mobile number is not valid")
    .required("required"),
});
function OrganizerSignup() {
  const [isOTPOpen, setOTPOpen] = useState(false);
  const [verify, setVerify] = useState(null);
  const [otp,setOTP] = useState(null)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values.mobile);
      axios
        .post(`${organizerAPI}exist`, values)
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
        await verify.confirm(otp);
        axios.post(`${organizerAPI}signup`, formik.values).then((response) => {
          if (response.data.status) {
            navigate("/organizer");
            setOTPOpen(false);
          }
        });
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
          <form  onSubmit={formik.handleSubmit}>
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
              style={{marginTop:'20px'}}
              className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200" 
              type="text"
              label='organizerName'
              {...formik.getFieldProps('organizerName')}
              />
              {formik.touched.organizerName && formik.errors.organizerName ? (<div className="text-red-600 pl-2">{formik.errors.organizerName}</div>):null}
              <TextField
              variant="standard"
              name="email"
              style={{marginTop:'20px'}}
              className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200" 
              type="text"
              label='email'
              {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (<div className="text-red-600 pl-2">{formik.errors.email}</div>):null}
              <TextField
              variant="standard"
              name="password"
              style={{marginTop:'20px'}}
              className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200" 
              type="password"
              label='password'
              {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (<div className="text-red-600 pl-2">{formik.errors.password}</div>):null}
              <TextField
              variant="standard"
              name="mobile"
              style={{marginTop:'20px'}}
              className="border p-2 mr-2 w-full rounded-2xl shadow-lg shadow-gray-200" 
              type="text"
              label='mobile'
              {...formik.getFieldProps('mobile')}
              />
              {formik.touched.mobile && formik.errors.mobile ? (<div className="text-red-600 pl-2">{formik.errors.mobile}</div>):null}
               
            </div>
            <div id="recaptcha-container" className="p-2"></div>
            <Button variant="contained" color="primary" type="submit" className="w-full" style={{marginTop:'30px'}}>Register</Button>
          </form>
          <Modal isOpen={isOTPOpen}>
            <div>
              <h2>Enter OTP</h2>

              <input
                type="text-"
                className="text-red-600"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />

              {/* ... */}
              <button onClick={handleOTPVerification}>Verify OTP</button>
            </div>
          </Modal>
          <Toaster />
        </div>
      </div>
    </main>
  );
}

export default OrganizerSignup;

import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { organizerActions } from "../../../Redux/app/organizerSlice";
import {organizerSignin} from '../../../Services/organizerApi'
import OrganizerPhoto from '../../../assets/Login/event-organizer-in-jakarta.jpg'
const initialValues ={
    email:'',
    password:''
  }
  const validate =(values)=>{
    let errors ={}
    if(!values.email){
      errors.email = 'required'
    }else if(!/^[A-Z0-9._+-]+@[A-Z0-9.0-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email format'
    }
    if(!values.password){
      errors.password = 'required'
    }
    return errors
  
  }
  
function OrganizerLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit:async(values)=>{
          const response =await organizerSignin(values)
            if(response.data.token){
              toast.success(response.data.message,{duration:4000})
              localStorage.setItem('organizertoken',response.data.token)
              // dispatch(organizerActions.organizerLogin({organizerName:response.data.organizerName,organizertoken:response.data.token}))
              navigate('/organizer/dashboard')
            }else{
              toast.error(response.data.message,{duration:4000})
            }
          }
      });

  return (
    <main className=" w-full  h-screen flex  rounded bg-cover">
      <div className=" bg-white grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] rounded-2xl ">
        <div className="hidden  md:items-center md:flex  ">
          <img
            className=" rounded-tl-2xl"
            src={OrganizerPhoto}
            alt=""
          />
        </div>
        <div className="p-4 flex flex-col justify-center">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-4xl font-bold p-5">Eventos.</h2>
            <p className="pl-4 mb-5 text-gray-400">
              Don't have an account?{" "}
              <span className="text-blue-600"> <Link to='/organizer/signup'> Register </Link> </span>
            </p>
            <div className="form-control">
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                label="Email"
                className="border p-2 mr-2  w-full rounded-2xl shadow-lg shadow-gray-200"
                />
                 {formik.touched.email &&formik.errors.email ? <div className="text-red-600 pl-2">{formik.errors.email}</div> :null}
              </div>
              <div className="form-control">
              <TextField
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                label="Password"
                className="border p-2  w-full rounded-2xl shadow-lg shadow-gray-200"
                style={{marginTop:'20px'}}
              />
              {formik.touched.password && formik.errors.password ? <div className="text-red-600 pl-2">{formik.errors.password}</div>:null}
            </div>
            {/* <p className="pl-2 p-5 text-gray-500 ">Forgot password ?</p> */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full"
            >
              Login
            </Button>
            <Toaster/>
          </form>
        </div>
        
      </div>
    </main>
  )
}

export default OrganizerLogin

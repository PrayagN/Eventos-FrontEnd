import React from "react";
import axios from "axios";
import { userAPI } from "../../../Api";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { userActions } from "../../../app/userSlice";
import { userSignin } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode"

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

function UserLogin() {

  const responseMessage = (response) => {
    let credential = jwt_decode(response.credential)
    const values ={
      email:credential.email,
        username:credential.name,
        password:credential.sub,
        exp:credential.exp
    }
    userSignin(values).then((response)=>{
      if(response.data.token){
        localStorage.setItem('usertoken',response.data.token)
        dispatch(userActions.userLogin())
        navigate('/')
      }else{
        toast.error(response.data.message)
      }
    })
  }
  const errorMessage =(error)=>{
    console.log(error);
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async(values)=>{
      console.log("ewq");
       userSignin(values).then((response)=>{

         if(response.data.token){
           // toast.success(data.message,{duration})
           localStorage.setItem('usertoken',response.data.token)
          //  dispatch(userActions.userAddDetails({Utoken:data.token,username:data.username}))
           navigate('/')
          }else if(data.message){
            toast.error(data.message,{duration:4000})
          }
        })




      // axios.post(`${userAPI}signin`,values).then((response)=>{
      //   if(response.data.status){
      //     toast.success(response.data.message,{duration:4000})
      //     localStorage.setItem('token',response.data.token)
      //     dispatch(userActions.userAddDetails({username:response.data.username,token:response.data.token}))
      //     navigate('/')
      //   }else{
      //     toast.error(response.data.message,{duration:4000})
      //   }
      // }).catch((error)=>{
      //   toast.error(error,{duration:4000})
      // })
    }
  });
  console.log(formik.errors);
  return (
    <main className=" w-full  h-screen flex  rounded bg-cover">
      <div className=" bg-white grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px] rounded-2xl">
        <div className="hidden md:block">
          <img
            className="w-full h-full rounded-tl-2xl"
            src="https://media.istockphoto.com/id/1200691321/vector/business-planning-team-vector.jpg?s=612x612&w=0&k=20&c=n-IbEy8i-6lEIqT2VRhnsqn5IHTaucu3iDzst7e9OFU="
            alt=""
          />
        </div>
        <div className="p-4 flex flex-col justify-center">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-4xl font-bold p-5">Eventos.</h2>
            <p className="pl-4 mb-5 text-gray-400">
              Don't have an account?{" "}
              <span className="text-blue-600"> <Link to='/signup'> Register </Link> </span>
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
              className="w-full p"
              style={{marginTop:'20px'}}
            >
              Login
            </Button>
            <Toaster/>
          </form>
          <div className="flex justify-center my-5">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </div>
        
      </div>
    </main>
  );
}

export default UserLogin;

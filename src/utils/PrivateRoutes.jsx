import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { adminAuth } from "../Services/adminApi";
import { organizerAuth } from "../Services/organizerApi";
import { userAuth } from "../Services/userApi";
import { useDispatch } from "react-redux";

import { userActions } from "../Redux/app/userSlice";
function PrivateRoutes({ role, route }) {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === "admin") {
      adminAuth()
        .then((response) => {
          if (!response.data.auth) {
            // localStorage.removeItem('admintoken')
          } else if (response.data.auth) {
            // Handle authentication success
          }
          setAuth(response.data.auth);
        })
        .catch((error) => {
          setAuth(false);
        });
    } else if (role === "organizer") {
      organizerAuth()
        .then((response) => {
          if (!response.data.auth) {
          } else if (response.data.auth) {
          }
          setAuth(response.data.auth);
        })
        .catch((error) => {
          setAuth(false);
        });
    } else if (role === "user") {
      userAuth()
        .then((response) => {
          if (response.data.auth) {
            dispatch(userActions.userLogin());
          }else{
            dispatch(userActions.userLogout())
          }
          setAuth(response.data.auth);
        })
        .catch((error) => {
          setAuth(false);
        });
    }
  }, []);

  if (auth === null) {
    return null; // Render nothing until the authentication check is complete
  }

  return auth ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoutes;

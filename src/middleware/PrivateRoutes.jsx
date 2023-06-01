import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { adminAuth } from "../Services/adminApi";

function PrivateRoutes({ role, route }) {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      adminAuth().then((response) => {
        if (!response.data.auth) {
          // localStorage.removeItem('admintoken')
        } else if (response.data.auth) {
          // Handle authentication success
        }
        setAuth(response.data.auth);
      }).catch((error) => {
        // Handle API error
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

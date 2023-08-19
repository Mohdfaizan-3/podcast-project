import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = useSelector(state=> state.user.user);
 
   if (!user) {
    return <Navigate to="/signup" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;

import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute=({ element: Component, ...restOfProps }) =>{
  const isAuthenticated = localStorage.getItem("token");
  console.log("this", isAuthenticated);

  return (
    
      <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default ProtectedRoute;
import React, { useEffect,useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";

function Auth() {
  const {state,getBasicUserInfo } = useAuthContext() || {};
  const [userDetails, setUserDetails] = useState();
  
  useEffect(() => {
    console.log("state:",state);
    state?.isAuthenticated &&
    getBasicUserInfo().then((response) => {
      setUserDetails(response);
    });
  }, [getBasicUserInfo, state?.isAuthenticated]);

  return state?.isAuthenticated  ? (
    userDetails?.groups?.includes("grama_officer") ? 
    (window.location.href = "/grama-dashboard"):
    (window.location.href = "/dashboard")
  ) : (
   window.location.href = "/landing"
  );
}

export default Auth;

import React, { useState,useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import "./landing.css";

const LandingPage = () => {
  const {state, signIn,getBasicUserInfo } = useAuthContext() || {};
  const [userDetails, setUserDetails] = useState();
  
  useEffect(() => {
    state?.isAuthenticated &&
    getBasicUserInfo().then((response) => {
      setUserDetails(response);
      console.log(response.groups);
    });
  }, [getBasicUserInfo, state?.isAuthenticated]);


  return (
    <>
      {state?.isAuthenticated  ? (
        userDetails?.groups?.includes("grama_officer") ? 
        (window.location.href = "/grama-dashboard"):
        (window.location.href = "/dashboard")
      ) : (
        <div className="landing-page">
          <div className="landing-page-logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web-login-7e719.appspot.com/o/logo%20full.png?alt=media&token=6ac63cc0-86bb-4333-85b9-bd63cb3b6df6"
              alt="Grama Check"
              className="landing-page-header-logo-image"
            />
          </div>
          <div className="welcome-container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/web-login-7e719.appspot.com/o/Certification.gif?alt=media&token=2e27c604-5df7-469e-aa3d-efe035d5a944"
              alt="landing-page-welcome-image"
              className="welcome-image"
            />
            <div className="welcome-text">
              <p className="welcome-header">Welcome to Grama Check!</p>
              <p className="welcome-message">
                Experience excellence in service
              </p>
              <button onClick={() => signIn()}>Sign In</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;

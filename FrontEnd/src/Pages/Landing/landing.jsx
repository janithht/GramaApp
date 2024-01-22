import React, { useState,useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import logo from "../../Assets/Logo.png";
import certificate from "../../Assets/Certification.gif";
import "./landing.css";

const LandingPage = () => {
  const {state, signIn,getBasicUserInfo } = useAuthContext() || {};
  const [userDetails, setUserDetails] = useState();
  
  useEffect(() => {
    console.log("state:",state);
    state?.isAuthenticated &&
    getBasicUserInfo().then((response) => {
      setUserDetails(response);
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
            src={logo}
              alt="Grama Check"
              className="landing-page-header-logo-image"
            />
          </div>
          <div className="welcome-container">
            <img
              src={certificate}
              alt="landing-page-welcome"
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

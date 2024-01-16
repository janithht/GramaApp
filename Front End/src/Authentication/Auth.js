import React,{useEffect} from "react";
import { useAuthContext  } from "@asgardeo/auth-react";
import LandingPage from "../Pages/Landing/landing";
import Dashboard from "../Pages/Dashboard/dashboard";
import Button from "../Components/Button/button"

function Auth() {

  const { state, signOut, getDecodedIDToken   } = useAuthContext();
  console.log(getDecodedIDToken );

  useEffect(() => {
    getDecodedIDToken().then((idToken) => {
        console.log(idToken.tenant_domain);
    }).catch((error) => {
        console.log(error); 
    })
}, []);

  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <Dashboard/>
          )
          :(<>
          <LandingPage/>
          </>)
      }
    </div>
  );
}

export default Auth;
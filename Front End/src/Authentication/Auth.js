import React,{useEffect} from "react";
import { useAuthContext  } from "@asgardeo/auth-react";
import LandingPage from "../Pages/Landing/landing";
import Dashboard from "../Pages/Dashboard/dashboard";

function Auth() {

  const { state, getDecodedIDToken } = useAuthContext();
  console.log(getDecodedIDToken );

  useEffect(() => {
    getDecodedIDToken().then((idToken) => {
        console.log(idToken.tenant_domain);
    }).catch((error) => {
        console.log(error); 
    })
}, [getDecodedIDToken]);

  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <div>
              <Dashboard/>
            </div>
          )
          :(<>
          <LandingPage/>
          </>)
      }
    </div>
  );
}

export default Auth;
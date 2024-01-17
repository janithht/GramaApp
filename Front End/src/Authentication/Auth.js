<<<<<<< HEAD
import React, { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
=======
import React,{useEffect} from "react";
import { useAuthContext  } from "@asgardeo/auth-react";
>>>>>>> fb1f4183a2a65f6b2861c31029c13fdd10701e40
import Landing from "../Pages/Landing/landing";
import Dashboard from "../Pages/Dashboard/dashboard";

function Auth() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div className="App">
      {state.isAuthenticated ? (
        <Dashboard />
        // <div>
        //   <ul>
        //     <li>{state.username}</li>
        //   </ul>

        //   <button onClick={() => signOut()}>Logout</button>
        // </div>
      ) : (
        <Landing />
        // <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}

export default Auth;

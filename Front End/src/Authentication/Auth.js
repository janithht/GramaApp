import React, { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
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

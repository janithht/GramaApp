import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";

import Auth from "./Authentication/Auth.js";

function App() {
  console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <AuthProvider
    config={ {
        signInRedirectURL: "http://localhost:3000",
        signOutRedirectURL: "http://localhost:3000",
        clientID: "ryD1c5JfkrO3MRH1CPQn_E8vInEa",
        baseUrl: "https://api.asgardeo.io/t/sagini",
        scope: [ "openid","profile" ]
    } }
>
  <Auth/>
</AuthProvider>
  );
}

export default App;
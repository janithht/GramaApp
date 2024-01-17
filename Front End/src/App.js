import React from "react";
import { AuthProvider } from "@asgardeo/auth-react";
import Auth from "./Authentication/Auth.js";
import Landing from "./Pages/Landing/landing.jsx";
import Dashboard from "./Pages/Dashboard/dashboard.jsx";
import Application from "./Pages/Application/application.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";


const Root =()=>{
  return(
    <div>
      <Outlet/>
    </div>
  )
}


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route> 
          <Route path='application' element={<Application/>}></Route>
          <Route path='dashboard' element={<Dashboard/>}></Route>
          <Route path='landing-page' element={<Landing/>}></Route>
        </Route>
        <Route path="*" element={<>Missing</>} />
      </Route>
    ));

  console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <div>
      
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
    <RouterProvider router={router}>
    </RouterProvider>
    </div>
  );
}

export default App;
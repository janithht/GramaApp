import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
<<<<<<< Updated upstream
=======
import Dashboard from "../Pages/Dashboard/dashboard";
import "./Auth.css";
// import Button from "../Components/Button/button";
import Landing from "../Pages/Landing/landing";
import Button from "../Components/Button/button"
>>>>>>> Stashed changes

function Auth() {

  const { state, signIn, signOut } = useAuthContext();
  console.log("state:",state);
console.log("username: ",state.username);
// const apiUrl = 'https://api.asgardeo.io/t/sagini/oauth2/authorize?scope=' ;

// // Make a GET request to the API
// fetch(apiUrl)
//   .then(response => {
//     // Check if the request was successful (status code 200)
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     // Parse and return the JSON data
//     return response.json();
//   })
//   .then(data => {
//     // Do something with the retrieved data
//     console.log('Data fetched successfully:', data);
//   })
//   .catch(error => {
//     // Handle errors
//     console.error('Error fetching data:', error);
//   });

  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <div>
              {/* <ul>
                <li>{state.username}</li>
<<<<<<< Updated upstream
              </ul>

              <button onClick={() => signOut()}>Logout</button>
=======
              </ul> */}
            <Dashboard/>
              <Button onClick={() => signOut()}>Logout</Button>
>>>>>>> Stashed changes
            </div>
          )
          // : <Button onClick={() => signIn()}>Login</Button>
          : <Landing />

      }
    </div>
  );
}

export default Auth;
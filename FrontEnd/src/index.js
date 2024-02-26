import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "@asgardeo/auth-react";
import "@coreui/coreui/dist/css/coreui.min.css";

const config = {
  signInRedirectURL: "https://gramacertify.choreoapps.dev",
  signOutRedirectURL: "https://gramacertify.choreoapps.dev",
  clientID: "ryD1c5JfkrO3MRH1CPQn_E8vInEa",
  baseUrl: "https://api.asgardeo.io/t/sagini",
  scope: ["openid", "profile", "groups", "address", "email", "phone"],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

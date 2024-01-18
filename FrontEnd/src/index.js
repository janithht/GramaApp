import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "@asgardeo/auth-react";
const config ={
  signInRedirectURL: "http://localhost:3000",
  signOutRedirectURL: "http://localhost:3000",
  clientID: "ryD1c5JfkrO3MRH1CPQn_E8vInEa",
  baseUrl: "https://api.asgardeo.io/t/sagini",
  scope: ["openid", "profile", 'groups'],
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider
        config={config}>
      <App />
        </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

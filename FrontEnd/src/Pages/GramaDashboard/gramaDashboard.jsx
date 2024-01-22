import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";

export default function GramaDashboard() {
  const { signOut } = useAuthContext() || {};
  return (
    <div>
      <h1>Grama Dashboard</h1>
      <br></br>
      <button onClick={()=>signOut()}>Logout</button>
    </div>
  )
}

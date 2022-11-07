import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContextProvider"


export default function ProtectedRoute({ children }){
    // const navigate = useNavigate();
    const {user}= useUserAuth();
    if(!user){
      return <Navigate to='/'/>;
    }
    return children

}
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const AuthLogin = () => {
  const { loginWithRedirect } = useAuth0();
  const clickhandler=()=>{
    loginWithRedirect();
  }
  return <Button handler={clickhandler} text="Login"/>;
};

export default AuthLogin;
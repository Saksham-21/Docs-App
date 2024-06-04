import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const AuthLogout = () => {
  const { logout } = useAuth0();
  const clickhandler = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };
  return <Button text="LogOut" handler={clickhandler} />;
};

export default AuthLogout;

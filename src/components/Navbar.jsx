import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogin from "./Auth/AuthLogin";
import AuthLogout from "./Auth/AuthLogout";
import { Outlet } from "react-router-dom";
import Background from "./Background";
import Button from "./Button/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Chatarea from "./Chatarea";
import HamburgerMenu from "./Hamburger";

function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const { setLoading, setChatarea, chatarea, setOpen, open } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const clickhandler = async () => {
    setLoading(true);
    try {
      // const response = await axios.post("https://16.171.250.97:5000/get_pdf_urls", {
      const response = await axios.post("http://localhost:5000/get_pdf_urls", {
        blob_name: user.email,
      });
      // console.log("sdskndskdnksdn")
      // console.log(response.data.urls);
      // console.log(response.data.message);
      setChatarea(true);
    } catch (error) {
    } finally {
      // console.log("edede")
      navigate("/foreground/chatarea");
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (chatarea) {
  //     navigate("/foreground/chatarea");
  //   }
  // }, [chatarea, navigate]);
  const handleGoBack = () => {
    navigate("/foreground");
    setChatarea(false);
  };
  return (
    <>
      <div className="w-full h-[9vh] z-[3] bg-zinc-900/80 backdrop-blur-sm flex  flex-row items-center">
        {/* {location.pathname === "/foreground" ||
        location.pathname === "/foreground/additem" ? (
          <>
            <div className="text-right ml-5 text-white/80 text-[1rem] md:text-xl">
              <HamburgerMenu/>
            </div>
          </>
        ) : (
          (location.pathname === "/foreground/chatarea" || location.pathname === "/organizer" || location.pathname === "/organizer/miniorganizer") && (
            <div className="text-right ml-5 text-white/80 text-[1rem] md:text-xl">
              <Button 
                text="Go Back" 
                handler={handleGoBack} 
              />
            </div>
          )
        )} */}
        {location.pathname !== "/" && (
          <div className="text-right ml-5 text-white/80 text-[1rem] md:text-xl">
            <HamburgerMenu />
          </div>
        )}
        <div className="text-right flex-1 mr-6 text-white/80 text-[1rem] md:text-xl">
          <span className="text-[1rem] md:text-xl font-bold mr-2 text-white/80">
            {isAuthenticated && `Welcome ${user.name}`}
          </span>
          {isAuthenticated ? <AuthLogout /> : <AuthLogin />}
          {console.log(isAuthenticated)}
        </div>
      </div>
      {location.pathname === "/foreground/chatarea" ? <Chatarea /> : <Outlet />}
      <Background />
    </>
  );
}

export default Navbar;

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogin from "./Auth/AuthLogin";
import AuthLogout from "./Auth/AuthLogout";
import { Outlet } from "react-router-dom";
import Background from "./Background";
import Button from "./Button/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Foreground from "./Foreground";
import { useAppContext } from '../context/context';

function Navbar() {
  const { isAuthenticated, user } = useAuth0();
  const {setLoading,setChatarea } = useAppContext(); 
  const location = useLocation();
  const clickhandler = async () => {
    setLoading(true);
    console.log("clicked Chat with PDFs");
    try {
      const response = await axios.post("http://localhost:5000/get_pdf_urls", {
        blob_name: user.email,
      });
      console.log(response.data.urls);
      console.log(response.data.message);
      setChatarea(true);
    } catch (error) {
      console.error("Error fetching PDF URLs:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-[9vh] z-[3] bg-zinc-900/80 backdrop-blur-sm flex  flex-row items-center">
        {location.pathname === "/foreground" && (
          <div className="text-right ml-5 text-white/80 text-[1rem] md:text-xl">
            <Button
              text="Chat with PDFs"
              handler={clickhandler}
              to={Foreground}
            />
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
      <Background />
      {/* {chatarea && <Chatarea />} */}
      <Outlet />
    </>
  );
}

export default Navbar;

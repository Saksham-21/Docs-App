import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLogin from "./Auth/AuthLogin";
import AuthLogout from "./Auth/AuthLogout";
import { Outlet } from "react-router-dom";
import Background from "./Background";

function Navbar() {
  const { isAuthenticated,user } = useAuth0();
  return (<>
  <div className="w-full h-[9vh] z-[3] bg-zinc-900/80 backdrop-blur-sm flex  flex-row items-center">
      <div className="text-right flex-1 mr-6 text-white/80 text-[1rem] md:text-xl">
        <span className="text-[1rem] md:text-xl font-bold mr-2 text-white/80">
          {isAuthenticated && `Welcome ${user.name}`}
        </span>
        {isAuthenticated ? <AuthLogout /> : <AuthLogin />}
        {console.log(isAuthenticated)}
      </div>
    </div>
    <Background/>
    <Outlet />
  </>
    
  );
}

export default Navbar;

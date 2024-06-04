import React from "react";
import Heroinitial from "./components/Heroinitial";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div className="w-full h-[91vh] bg-zinc-800 relative">
        <Navbar/>
        {/* <Heroinitial/> */}
        {/* <Outlet/> */}
        {/* <Background/> */}
      </div>
    </>
  );
}

export default App;

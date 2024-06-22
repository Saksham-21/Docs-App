import React from "react";
import Heroinitial from "./components/Heroinitial";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import { Outlet } from "react-router-dom";
import { useAppContext } from "./context/context";
import Chatarea from "./components/Chatarea";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const { loading,chatarea } = useAppContext();
  return (
    <>
      <div className="w-full h-[100vh] bg-zinc-800 relative">
        <Navbar/>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        )}
        {/* <Heroinitial/> */}
        {/* <Outlet/> */}
        {/* <Background/> */}
        {/* {chatarea && <Chatarea />} */}
      </div>
    </>
  );
}

export default App;

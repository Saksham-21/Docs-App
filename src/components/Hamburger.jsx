// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import axios from "axios";
// import { useAppContext } from "../context/context";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// // import Button from "./Button/Button";
// // import Button from '@mui/material/Button';

// function HamburgerMenu() {
//   const [open, setOpen] = useState(false);
//   const { isAuthenticated, user } = useAuth0();
//   const navigate = useNavigate();
//   const { setLoading, setChatarea, chatarea } = useAppContext();

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };
//   const clickhandler1 = async () => {
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/get_pdf_urls", {
//         blob_name: user.email,
//       });
//       setChatarea(true);
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };
//   const clickhandler2 = () => {
//     navigate("/organizer");
//   };
//   useEffect(() => {
//     if (chatarea) {
//       navigate("/foreground/chatarea");
//     }
//   }, [chatarea, navigate]);

//   const DrawerList = (
//     <Box
//       sx={{ width: 300 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       className="bg-zinc-900/90  h-screen"
//     >
//       <List className="text-white/80">
//         <div className="text-xl font-bold">
//           <Link
//             className="flex m-7 gap-3"
//             to="/foreground"
//             onClick={clickhandler1}
//           >
//             <img src="/chat2.png" alt="" className="h-[45px]" />
//             <span className="mt-2">Chat with PDFs</span>
//           </Link>
//           <Link className="flex m-7 gap-3" onClick={clickhandler2} to="#">
//             <img src="/organize.png" alt="" className="h-[45px]" />
//             <span className="mt-2">Organize PDFs</span>
//           </Link>
//         </div>
//       </List>
//     </Box>
//   );
//   return (
//     <div>
//       <div onClick={toggleDrawer(true)} className="cursor-pointer ml-2">
//         <span className="h-[4px] bg-white/80 block w-[35px]"></span>
//         <span className="h-[4px] bg-white/80 block w-[35px] mt-1 mb-1"></span>
//         <span className="h-[4px] bg-white/80 block w-[35px]"></span>
//       </div>
//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// }

// export default HamburgerMenu;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import axios from "axios";
import { useAppContext } from "../context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { setLoading, setChatarea, chatarea } = useAppContext();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const clickhandler1 = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/get_pdf_urls", {
        blob_name: user.email,
      });
      setChatarea(true);
    } catch (error) {
    } finally {
      navigate("/foreground/chatarea")
      setLoading(false);
    }
  };

  // const clickhandler2 = () => {
  //   navigate("/organizer");
  // };

  // useEffect(() => {
  //   if (chatarea) {
  //     navigate("/foreground/chatarea");
  //   }
  // }, [chatarea, navigate]);

  const DrawerList = (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="bg-zinc-900/90 h-screen text-white"
    >
      <div className="p-4">
        <img
          src="/vault.png"
          alt="Logo"
          className="h-[150px]  mb-6 ml-[30px]"
        />
        <List className="space-y-6">
          <Link
            className="flex items-center p-4 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
            // onClick={clickhandler2}
            to="/foreground"
          >
            <img
              src="/docs.png"
              alt="Organize PDFs"
              className="h-10 w-10"
            />
            <span className="ml-4 text-lg font-semibold">All PDFs</span>
          </Link>
          <Link
            className="flex items-center p-4 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
            to="/foreground"
            onClick={clickhandler1}
          >
            <img src="/chat2.png" alt="Chat with PDFs" className="h-10 w-10" />
            <span className="ml-4 text-lg font-semibold">Chat with PDFs</span>
          </Link>
          <Link
            className="flex items-center p-4 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
            // onClick={clickhandler2}
            to="/organizer"
          >
            <img
              src="/organize.png"
              alt="Organize PDFs"
              className="h-10 w-10"
            />
            <span className="ml-4 text-lg font-semibold">Organize PDFs</span>
          </Link>
        </List>
      </div>
    </Box>
  );

  return (
    <div>
      <div onClick={toggleDrawer(true)} className="cursor-pointer ml-2">
        <span className="h-1 bg-white/80 block w-8 rounded-sm mb-1"></span>
        <span className="h-1 bg-white/80 block w-8 rounded-sm mb-1"></span>
        <span className="h-1 bg-white/80 block w-8 rounded-sm"></span>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;

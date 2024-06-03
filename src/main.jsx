import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Foreground from "./components/Foreground.jsx";
import Navbar from "./components/Navbar.jsx";
import Additem from "./components/AddItem/Additem.jsx";
import Heroinitial from "./components/Heroinitial.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Heroinitial />,
      },
      {
        path: "foreground",
        element: <Foreground />,
      },
    ],
  },
  {
    path: "/foreground",
    element: <Foreground />,
    children: [
      {
        path: "additem",
        element: <Additem />,
      },
    ],
  },
  // {
  //   path:"/foreground",
  //   element:[<Foreground/>],
  //   children:[
  //     {
  //       path:"/additem",
  //       element:[<Additem/>],
  //     }
  //   ]
  // }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-57eoqp4kf3a4vte5.us.auth0.com"
      clientId="T83uy7ueXsGJQWBvnYtRykxUYHoZaRi8"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);

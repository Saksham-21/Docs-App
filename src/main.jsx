import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Foreground from "./components/Foreground.jsx";
import Additem from "./components/AddItem/Additem.jsx";
import Heroinitial from "./components/Heroinitial.jsx";
import { AppProvider } from "../src/context/context";

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
        children: [
          {
            path: "additem",
            element: <Additem />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/foreground",
  //   element: <Foreground />,
  //   children: [
  //     {
  //       path: "/foreground",
  //       element: <Heroinitial />,
  //     },
  //     {
  //       path: "additem",
  //       element: <Additem />,
  //     },
  //   ],
  // },
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
    <AppProvider>
      <Auth0Provider
        domain= {import.meta.env.VITE_AUTH0_DOMAIN}
        clientId= {import.meta.env.VITE_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </AppProvider>
  </React.StrictMode>
);

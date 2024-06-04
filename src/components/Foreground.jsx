import React, { useRef, useState, useEffect } from "react";
import Cards from "./Cards";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Additem from "./AddItem/Additem";
import { useAppContext } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import { listFilesForEmail } from "../firebasesetup/setup";
import { useNavigate } from "react-router-dom";

function Foreground() {
  const { user, isAuthenticated, isLoading ,getAccessTokenSilently } = useAuth0();
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const { reloadKey } = useAppContext();
  const navigate = useNavigate();
  // const [userMetadata, setUserMetadata] = useState(null);
  useEffect(() => {
    // const getUserMetadata = async () => {
    //   const domain = "dev-rs368k5fp261f7yj.us.auth0.com";
    //   try {
    //     const accessToken = await getAccessTokenSilently({
    //       audience: `https://${domain}/api/v2/`,
    //       scope: "read:current_user",
    //     });
  
    //     const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
    //     const metadataResponse = await fetch(userDetailsByIdUrl, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });
  
    //     const { user_metadata } = await metadataResponse.json();
  
    //     setUserMetadata(user_metadata);
    //   }catch (e) {
    //     console.log(e.message);
    //   }
    // }
    // if(isLoading==false) {getUserMetadata();}
    if (!isLoading && isAuthenticated) {
      // console.log("Foreground component re-rendered");
      const fetchFiles = async () => {
        const files = await listFilesForEmail(user.email);
        setFiles(files);
      };
      fetchFiles();
      console.log(files);
    }
  }, [reloadKey, user.email,isLoading]);

  const [showAddItem, setShowAddItem] = useState(false);

  const handleAddItemClick = () => {
    // console.log("clicked");
    setShowAddItem((pre) => !pre);
    setTimeout(() => {
      if (showAddItem) {
        navigate("/foreground");
      }
    }, 0);
  };

  return (
    <>
      {isAuthenticated && (
        <div
          ref={ref}
          className="fixed w-full h-full  z-[4]   backdrop-blur-sm"
        >
          <div className="flex gap-10  flex-wrap z-[3] mt-10 ml-10 mr-10 mb-10">
            {files.map((file, index) => (
              <div key={index} className="">
                <Cards
                  data={{ desc: file.name, Url: file.url }}
                  reference={ref}
                />
              </div>
            ))}
          </div>
          <Link
            to="/foreground/additem"
            onClick={handleAddItemClick}
            className="bg-blue-600 fixed bottom-[12vh] left-[4vw] text-[8vh] rounded-full sm:left-[2vw] sm:bottom-[14vh]"
          >
            {showAddItem ? (
              <MdAdd className="transform rotate-45 transition-transform duration-300" />
            ) : (
              <MdAdd className="transform transition-transform duration-300" />
            )}
            {/* <MdAdd /> */}
          </Link>
        </div>
      )}
      {showAddItem && <Additem setShowAddItem={setShowAddItem} />}
    </>
  );
}

export default Foreground;

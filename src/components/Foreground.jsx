import React, { useRef, useState, useEffect } from "react";
import Cards from "./Cards";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Additem from "./AddItem/Additem";
import styles from "./Foreground.module.css"
import { useAppContext } from "../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import { listFilesForEmail } from "../firebasesetup/setup";
import { useNavigate } from "react-router-dom";

function Foreground() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const ref = useRef(null);
  const [files, setFiles] = useState([]);
  const { reloadKey } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const fetchFiles = async () => {
        const files = await listFilesForEmail(user.email);
        setFiles(files);
      };
      fetchFiles();
      console.log(files);
    }
  }, [reloadKey, user.email, isLoading]);

  const [showAddItem, setShowAddItem] = useState(false);

  const handleAddItemClick = async () => {
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
          className="fixed w-full  z-[4]  h-screen backdrop-blur-sm"
        >
          <div className={`${styles["custom-scroll"]} flex gap-8  flex-wrap z-[3] p-10 overflow-y-auto h-[calc(100vh-9vh)]`}>
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
              className="fixed bottom-[12vh] left-[2vw] text-[8vh] rounded-full "
            >
              {showAddItem ? (
                // <MdAdd className="transform rotate-45 transition-transform duration-300" />
                <img src="/plus.png" alt="" className="h-[60px] transform rotate-45 transition-transform duration-300"/>
              ) : (
                // <MdAdd className="transform transition-transform duration-300" />
                <img src="/plus.png" alt="" className="h-[60px] transform transition-transform duration-300"/>
              )}
            </Link>
            <div className="flex justify-center items-center">
              {showAddItem && (
                <Additem setShowAddItem={setShowAddItem} reference={ref} />
              )}
            </div>
        </div>
      )}
    </>
  );
}

export default Foreground;

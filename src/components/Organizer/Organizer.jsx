import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { listOrganizedFolders } from "../../firebasesetup/setup";
import { listOrganizedFiles } from "../../firebasesetup/setup";
import { Link } from "react-router-dom";
import MiniOrganizer from "./MiniOrganizer";

const Organizer = () => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth0();
  const [folders, setFolders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [foldername, setFoldername] = useState();
  useEffect(() => {
    const fetchFolders = async () => {
      if (!authLoading && isAuthenticated && user && user.email) {
        try {
          const folderNames = await listOrganizedFolders(user.email);
          setFolders(folderNames);
        } catch (error) {
          console.error("Error fetching folders:", error);
        }
      }
    };

    fetchFolders();
  }, [user, authLoading, isAuthenticated]);
  const clickHandler = async (folder, email) => {
    try {
      const fetchedFiles = await listOrganizedFiles(folder, email);
      setFiles(fetchedFiles);
    } finally {
      setFoldername(folder);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className="backdrop-blur-sm z-[4] fixed  h-screen w-full">
      <div className="grid grid-cols-5 grid-rows-5 gap-x-1 gap-y-1 p-10">
        {folders.map((folder, index) => (
          <Link
            to="miniorganizer"
            onClick={() => clickHandler(folder, user.email)}
            key={index}
          >
            <span key={index} className="cursor-pointer">
              <img src="/f22.png" className="w-[50%]" />
              <div className="text-white/80 font-semibold text-2xl w-[50%] text-center">
                {folder}
              </div>
            </span>
          </Link>
        ))}
      </div>
      <MiniOrganizer
        isVisible={modalVisible}
        onClose={handleCloseModal}
        files={files}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{foldername}</h2>
      </MiniOrganizer>
    </div>
  );
};

export default Organizer;

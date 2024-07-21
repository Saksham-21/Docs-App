import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploadFileToFirebaseStorage } from "../../firebasesetup/setup";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";

function Additem({ reference, setShowAddItem }) {
  const [file, setFile] = useState("");
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { setReloadKey } = useAppContext();

  const onSubmitf = async (e) => {
    e.preventDefault();
    setShowAddItem(false);
    console.log(user.email);
    const email = user.email;
    if (file.length > 0 && email) {
      try {
        const uploadPromises = file.map((filee) => uploadFileToFirebaseStorage(email, filee));
        const downloadURLs = await Promise.all(uploadPromises);
        console.log("Files uploaded successfully. File URLs:", downloadURLs);
        setReloadKey((prevKey) => prevKey + 1);
        navigate("/foreground");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      console.error("Email and files are required");
    }
  };

  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        className="text-white fixed inset-0 left-[40vw] top-[27vh] w-[20vw] h-[37vh] rounded-[40px] bg-zinc-900 overflow-hidden  z-[5] px-5 py-8"
      >
        <div className="text-center text-[5.5vh] font-bold text-white ">
          Add File
        </div>
        <form onSubmit={onSubmitf} className="flex flex-col gap-5 mt-5">
          <input
            type="file"
            multiple
            placeholder="Choose file"
            className="p-2 rounded-md text-white text-center  "
            onChange={(e) => {
              // setFile(e.target.files[0]);
              setFile([...e.target.files]);
            }}
          />
          <button
            to={"/foreground"}
            type="submit"
            className="bg-blue-600 text-center p-2 rounded-[15px] text-lg font-semibold  text-zinc-800"
          >
            Add Item
          </button>
        </form>
      </motion.div>
    </>
  );
}

export default Additem;

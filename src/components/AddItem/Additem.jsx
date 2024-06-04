import React, { useState } from "react";
import Cards from "../Cards";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { uploadFileToFirebaseStorage } from "../../firebasesetup/setup";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../context/context"; 

function Additem({ reference, setShowAddItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { setReloadKey } = useAppContext(); 

  const onSubmitf = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("file", file);
    // console.log(formData);
    setShowAddItem(false);
    console.log(user.email)
    const email = user.email;
    if (file && email) {
      try {
        const downloadURL = await uploadFileToFirebaseStorage(email, file);
        // console.log("File uploaded successfully. File URL:", downloadURL);
        setReloadKey(prevKey => prevKey + 1);
        navigate('/foreground');
      } catch (error) {
        // console.error("Error uploading file:", error);
      }
    } else {
      // console.error("Email and file are required");
    }
    

  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      className="text-white w-[15vw]   min-h-[32vh] relative  sm:w-[20vw] rounded-[40px] bg-zinc-900/90 overflow-hidden flex-shrink-0 z-10 px-5 py-8"
    >
      <div className="text-center text-[5.5vh] font-bold text-white ">
        Add File
      </div>
      <form onSubmit={onSubmitf} className="flex flex-col gap-5 mt-5">
        {/* <input
          type="text"
          placeholder="File Title"
          className="bg-zinc-900/80 p-2 rounded-md text-white"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        /> */}

        {/* <input
          type="text"
          placeholder="Description"
          className="bg-zinc-900/80 p-2 rounded-md text-white"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        /> */}
        <input
          type="file"
          placeholder="Choose file"
          className="p-2 rounded-md text-white text-center  "
          onChange={(e) => {
            setFile(e.target.files[0]);
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
  );
}

export default Additem;

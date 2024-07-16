import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { deleteFileFromStorage } from "../firebasesetup/setup";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppContext } from '../context/context';
  
function Cards({ data, reference }) {
  const { user } = useAuth0();
  const { setReloadKey } = useAppContext(); 
  const handleDeleteClick = async (namee) => {
    try {
      // console.log("Deleting file:", namee);
      await deleteFileFromStorage(namee,user.email);
      setReloadKey(prevKey => prevKey + 1);
      // console.log("File deleted successfully");
    } catch (error) {
      // console.error("Error deleting file:", error);
    }
  }
  return (
    <motion.div
      drag
      dragConstraints={reference}
      className="text-white px-5 py-8 w-60 min-h-[50px] relative  rounded-[40px] bg-zinc-900/90 overflow-hidden flex-shrink-0"
    >
      <FaRegFileAlt size="1.5em" color="#fff" />
      <div className="mb-1 mt-4 h-auto">
        <p className="text-lg leading-tight font-semibold break-words">
          {data.desc.length >30
            ? `${data.desc.substring(0,30)}...`
            : data.desc}
            {/* {data.desc} */}
        </p>
      </div>
      <div className="footer bottom-0 w-full left-0 mt-3">
        <div className="flex items-center justify-between  mt-4">
          {/* <p className="text-xl">{data.filesize}</p> */}
          <span className="w-10 h-10 bg-zinc-600 rounded-full flex justify-center items-center">
            <RiDeleteBin2Fill onClick={()=>handleDeleteClick(data.desc)} size="1.5em" color="#fff" />
          </span>
        </div>
        <div
          className={`tag w-full py-3 bg-green-600 flex justify-center items-center rounded-[15px] mt-4`}
        >
          <a
            href={data.Url}
            download
            className="text-lg font-semibold text-zinc-800"
            target="_blank"
          >
            Download
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Cards;

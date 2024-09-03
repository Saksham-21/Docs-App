// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { uploadFileToFirebaseStorage } from "../../firebasesetup/setup";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../../context/context";
// import axios from "axios";

// function Additem({ reference, setShowAddItem }) {
//   const [file, setFile] = useState("");
//   const { user } = useAuth0();
//   const navigate = useNavigate();
//   const { setReloadKey } = useAppContext();

//   const onSubmitf = async (e) => {
//     e.preventDefault();
//     const fileName=file[0].name;
//     console.log('fileNames',fileName);
//     // const fileNames = file.map(file => file.name);
//     // const fileName=fileNames[0].text;
//     // console.log('File names:', fileNames);
//     setShowAddItem(false);
//     console.log(user.email);
//     const email = user.email;
//     if (file.length > 0 && email) {
//       try {
//         const uploadPromises = file.map((filee) =>
//           uploadFileToFirebaseStorage(email, filee)
//         );
//         const downloadURLs = await Promise.all(uploadPromises);
//         console.log("Files uploaded successfully. File URLs:", downloadURLs);
//         setReloadKey((prevKey) => prevKey + 1);
//         navigate("/foreground");
//       } catch (error) {
//         console.error("Error uploading files:", error);
//       }
//     } else {
//       console.error("Email and files are required");
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/check");
//       console.log("Successful", response);

//       await axios.post("http://localhost:5000/categorize", {
//         blob_name: user.email,
//         fileName:fileName
//       });
//     } catch (error) {
//       console.log("Not Successful");
//     }
//   };

//   return (
//     <>
//       <motion.div
//         // drag
//         // dragConstraints={reference}
//         className="text-white fixed inset-0 left-[40vw] top-[27vh] w-[20vw] h-[37vh] rounded-[40px] bg-zinc-900 overflow-hidden  z-[5] px-5 py-8"
//       >
//         <div className="text-center text-[5.5vh] font-bold text-white ">
//           Add File
//         </div>
//         <form onSubmit={onSubmitf} className="flex flex-col gap-5 mt-5">
//           <input
//             type="file"
//             placeholder="Choose file"
//             className="p-2 rounded-md text-white text-center  "
//             onChange={(e) => {
//               // setFile([...e.target.files]);
//               setFile(Array.from(e.target.files));
//               // setFile(e.target.files[0]);
//             }}
//           />
//           <button
//             to={"/foreground"}
//             type="submit"
//             className="bg-blue-600 text-center p-2 rounded-[15px] text-lg font-semibold  text-zinc-800"
//           >
//             Add Item
//           </button>
//         </form>
//       </motion.div>
//     </>
//   );
// }

// export default Additem;







import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploadFileToFirebaseStorage } from "../../firebasesetup/setup";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";
import axios from "axios";

function Additem({ setShowAddItem }) {
  const [file, setFile] = useState([]);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { setReloadKey } = useAppContext();

  const handleBackdropClick = () => {
    setShowAddItem(false);
    navigate("/foreground");
  };

  const onSubmitf = async (e) => {
    e.preventDefault();
    const fileName = file.length > 0 ? file[0].name : "";
    console.log('fileNames', fileName);
    setShowAddItem(false);
    console.log(user.email);
    const email = user.email;
    if (file.length > 0 && email) {
      try {
        const uploadPromises = file.map((filee) =>
          uploadFileToFirebaseStorage(email, filee)
        );
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
    try {
      const response = await axios.post("http://localhost:5000/check");
      console.log("Successful", response);

      await axios.post("http://localhost:5000/categorize", {
        blob_name: user.email,
        fileName: fileName
      });
    } catch (error) {
      console.log("Not Successful");
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
        onClick={handleBackdropClick}>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="bg-zinc-900 rounded-2xl p-8 w-[90%] max-w-md mx-auto"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking inside the modal
        >
          <div className="text-center text-3xl font-bold text-white mb-4">
            Add File
          </div>
          <form onSubmit={onSubmitf} className="flex flex-col gap-5">
            <input
              type="file"
              placeholder="Choose file"
              className="p-3 rounded-md text-white bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:outline-none"
              onChange={(e) => {
                setFile(Array.from(e.target.files));
              }}
            />
            <button
              type="submit"
              className="bg-blue-600 p-3 rounded-lg text-lg font-semibold text-white hover:bg-blue-700 transition duration-200"
            >
              Add Item
            </button>
          </form>
        </div>
      </motion.div>
      </div>
    </>
  );
}

export default Additem;



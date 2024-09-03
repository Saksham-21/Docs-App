import React from "react";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MiniOrganizer = ({ isVisible, onClose, children, files }) => {
  const navigate = useNavigate();
  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    navigate("/organizer");
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
      >
        <div
          className="bg-zinc-900 p-4 rounded-lg w-1/2 max-w-lg  text-white/80"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          {children}
          <ul>
            {files.map((file, index) => (
              <a
                key={index}
                target="_blank"
                href={file.url}
                className="flex m-2 bg-zinc-800 p-2 rounded-lg hover:bg-zinc-800/60"
              >
                <img src="/pdf2.png" alt="" className="h-[50px]" />
                <span
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center ml-3 mt-3 font-bold"
                >
                  {file.name}
                </span>
              </a>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniOrganizer;

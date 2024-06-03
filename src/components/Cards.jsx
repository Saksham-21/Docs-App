import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {motion} from "framer-motion"

function Cards({ data,reference }) {
  return (
    <motion.div  drag  dragConstraints={reference} className="text-white px-5 py-8 w-60 min-h-[50px] relative  rounded-[40px] bg-zinc-900/90 overflow-hidden flex-shrink-0">
      <FaRegFileAlt size="1.5em" color="#fff" />
      <div className="mb-1 mt-3 h-auto">
        <p className="text-lg leading-tight font-semibold">{data.desc}</p>
      </div>
      <div className="footer bottom-0 w-full left-0 mt-3">
        <div className="flex items-center justify-between  mt-2">
          <p className="text-xl">{data.filesize}</p>
          <span className="w-10 h-10 bg-zinc-600 rounded-full flex justify-center items-center">
            {data.close ? (
              <IoClose size="1.5em" color="#fff" />
            ) : (
              <LuDownload size="1.5em" color="#fff" />
            )}
          </span>
        </div>

        {data.tag.isopen && (
          <div className={`tag w-full py-3 ${data.tag.tagColor === "blue"?"bg-blue-600":"bg-green-600"} flex justify-center items-center rounded-[15px] mt-2`}>
            <h3 className="text-lg font-semibold text-zinc-800">
              {data.tag.tagTitle}
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Cards;

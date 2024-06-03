import React from "react";
import Cards from "../Cards";
import { motion } from "framer-motion";

function Additem({ reference }) {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      className="text-white w-full  pt-[15vh] min-h-[70vh] relative  sm:w-[35vw] rounded-[40px] bg-zinc-900/90 overflow-hidden flex-shrink-0"
    >

    </motion.div>
  );
}

export default Additem;

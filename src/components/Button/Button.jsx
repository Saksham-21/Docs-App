import React from "react";
import { Link } from "react-router-dom";

function Button({ text, handler, to}) {
  return (
    <Link className="p-[3px] relative inline-block" onClick={handler} to={to}>
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-white/90 rounded-lg " />
      <div className="px-8 py-2 font-bold bg-black rounded-[6px]  relative group transition duration-200 text-white/70 hover:bg-transparent hover:text-black hover:font-bold">
        {text}
      </div>
    </Link>
  );
}

export default Button;

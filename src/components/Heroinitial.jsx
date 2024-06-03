import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./Button/Button";

function Heroinitial() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["AI-Document Segmentation", "Document Summarizer"],
      typeSpeed: 20,
      backSpeed: 10,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  const { isAuthenticated } = useAuth0();
  return (
    <div className="fixed w-full h-[91vh] z-[4] backdrop-blur-sm ">
      <div className="mt-[18vh]">
        <div className="flex flex-col sm:flex-row">
          <span className="text-[5rem]  text-white font-bold leading-none sm:text-[8rem]">
            DocVault
          </span>
          <span className="text-[5rem]  text-white font-bold leading-none sm:text-[8rem]">
            Pro
          </span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <span
            ref={el}
            className=" font-mono text-[3rem] ml-5 text-white/70 font-bold leading-none sm:text-[5rem]"
          />
        </div>
        {isAuthenticated && (
          <div className="mt-7 ml-10 text-[1rem] md:text-xl">
            <Button text="Go Next->" to="/foreground"/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Heroinitial;

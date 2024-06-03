import React from "react";

function Background() {
  return (
    <>
      <div className="fixed w-full h-[91vh] z-[3] bg-zinc-800">
        <div className="w-full py-10 flex justify-center text-zinc-600 font-semibold text-xl absolute top-[5%]">
          {" "}
          Documents
        </div>
        <h1 className="text-[13vw] leading-none tracking-tight absolute font-semibold text-zinc-900 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          Docs.
        </h1>
      </div>
    </>
  );
}

export default Background;

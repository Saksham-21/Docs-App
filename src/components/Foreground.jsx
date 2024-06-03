import React, { useRef,useState } from "react";
import Cards from "./Cards";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Additem from "./AddItem/Additem";

function Foreground() {
  const ref = useRef(null);
  const data = [
    {
      desc: "Lorem kwndkwdkwmkmwkw windwidnwidw windwi ",
      filesize: "0.9mb",
      close: true,
      tag: { isopen: true, tagTitle: "Download Now", tagColor: "blue" },
    },
    {
      desc: "lorem dwsqswdswd wdwdwdw dwdwdwd dwdw hidwdiwdn",
      filesize: "0.9mb",
      close: false,
      tag: { isopen: true, tagTitle: "Download Now", tagColor: "green" },
    },
    {
      desc: "Lorem kwndkwdkwmkmwkw windwidnwidw windwiefefefefef fwfbwkdfwkndfkwnww dwdwdwkfdnk  ",
      filesize: "0.9mb",
      close: true,
      tag: { isopen: true, tagTitle: "Download Now", tagColor: "blue" },
    },
  ];
  const [showAddItem, setShowAddItem] = useState(false);

  const handleAddItemClick = () => {
    console.log("clicked");
    setShowAddItem(true);
  };

  return (
    <>
      <div ref={ref} className="fixed w-full h-full  z-[4]   backdrop-blur-sm">
        <div className="flex gap-10  flex-wrap z-[3] mt-10 ml-10 mr-10 mb-10">
          {data.map((item, index) => (
            <div key={index} className="">
              <Cards data={item} reference={ref} />
            </div>
          ))}
        </div>
        <Link
          to="/foreground/additem"
          onClick={handleAddItemClick}
          className="bg-blue-600 fixed bottom-[12vh] left-[4vw] text-[8vh] rounded-full sm:left-[2vw] sm:bottom-[14vh]"
        >
          <MdAdd />
        </Link>
      </div>
      {showAddItem && <Additem />}
    </>
  );
}

export default Foreground;

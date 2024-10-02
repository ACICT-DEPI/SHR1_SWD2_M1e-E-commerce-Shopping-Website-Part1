import React from "react";
import useColorMode from "../../../hooks/useColorMode";
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  const handleChange = () => {
    if (typeof setColorMode === "function") {
      setColorMode(colorMode === "light" ? "dark" : "light");
    }
  };

  return (
    <li>
      <label
        className={`relative block h-7.5 w-14 rounded-full m-0 ${
          colorMode === "dark" ? "bg-primary" : "bg-stroke"
        }`}
      >
        <input
          type="checkbox"
          onChange={handleChange}
          checked={colorMode === "dark"}
          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 transition duration-300"
        />
        <span
          className={`absolute top-1/2 -translate-y-1/2 left-[3px] h-6 w-6 flex justify-center items-center bg-white rounded-full duration-100 ease-linear shadow-sm ${
            colorMode === "dark" ? "!right-[3px] !translate-x-full" : ""
          }`}
        >
          <MdWbSunny className="inline-block dark:hidden" />
          <IoMdMoon className="hidden dark:inline-block" />
        </span>
      </label>
    </li>
  );
};

export default DarkModeSwitcher;

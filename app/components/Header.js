import React from "react";
import { MdLocationOn, MdSearch } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  return (
    <div className="px-[15px] lg:px-[25px] py-[16px] shadow-custom-bottom text-custom-indigo flex justify-between items-center">
      <div className="">
        <h1 className="text-2xl font-semibold italic tracking-wide">
          PrivateDelights
        </h1>
      </div>

      <div className="flex justify-between items-center gap-[17px]">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl text-black opacity-50">
            <MdLocationOn />
          </span>
          <p className="hidden md:block">Location</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl text-black opacity-50">
            <MdSearch />
          </span>
          <p className="hidden md:block">Search</p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-[22px] text-black opacity-50">
            <FaUserCircle />
          </span>
          <p className="hidden md:block">Login</p>
        </div>
      </div>
    </div>
  );
}

export default Header;

"use client";
import UserToggle from "./userToggle";
import logoutIcon from "../../public/images/svg/logout-icon.svg";
import Image from "@/node_modules/next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-end p-[16px] border-b border-light-gray">
      <div className="flex items-center gap-[16px]">
        <UserToggle />
        <hr className="flex border-l border-[0.5px] border-light-gray border-dashed h-[40px]"></hr>
        <span className="font-lato text-primary-text">
          <Image
            priority
            src={logoutIcon}
            alt="Logout"
            className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#c597d4]"
          />
        </span>
      </div>
    </nav>
  );
}

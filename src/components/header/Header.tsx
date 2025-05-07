"use client";

import DesktopMenu from "./menus/DesktopMenu";
import MobileMenu from "./menus/MobileMenu";

export default function Header() {
  return (
    <div className="">
      <div className='md:block hidden'>
        <DesktopMenu />
      </div>
      <div className='md:hidden block'>
        <MobileMenu />
      </div>
    </div>
  );
}

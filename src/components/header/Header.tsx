"use client";

import { useEffect, useState } from "react";
import DesktopMenu from "./menus/DesktopMenu";
import MobileMenu from "./menus/MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Add background when scrolled a bit
      setScrolled(currentY > 10);

      // Show header when scrolling up, hide when down
      if (currentY > lastScrollY && currentY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? " bg-lighter/90 shadow" : "bg-transparent"
      } ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
      <div className='md:block hidden'>
        <DesktopMenu />
      </div>
      <div className='md:hidden block'>
        <MobileMenu />
      </div>
    </div>
  );
}

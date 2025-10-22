"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const lastScrollTop = useRef(0);

  useEffect(() => {
    // Make sure window exists (Next.js SSR safety)
    if (typeof window === "undefined") return;

    const navbar = navbarRef.current;
    if (!navbar) return; // still no element? exit early

    const handleScroll = () => {
      if (!navbarRef.current) return; // safe guard (fixes your crash)

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop.current) {
        // scrolling down → hide navbar
        navbarRef.current.style.top = "-120px";
      } else {
        // scrolling up → show navbar
        navbarRef.current.style.top = "0";
      }

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 h-14 w-full navbar transition-all duration-300 ${
        menuOpen ? "translate-y-[-50px]" : "translate-y-0"
      }`} ref={navbarRef}>
            <div className="flex justify-center py-6 px-4">
                <div className="bg-white/70 shadow px-6 rounded-4xl w-full max-w-3xl border-3 border-gray-400 ">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <Link href="/">
                                <Image
                                    src="logo.svg"
                                    alt="Logo"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                    
                                />
                            </Link>
                        </div>

                        <div className="hidden sm:flex sm:items-center gap-6">
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">View Ideas</a>
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Add Ideas</a>
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Your Ideas</a>
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">About</a>
                        </div>

                        <div className="hidden sm:flex sm:items-center gap-4">
                            <Link href="/pages/login" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Sign in</Link>
                            <a href="/pages/signup" className="text-gray-800 text-sm font-semibold border border-gray-800 px-4 py-2 rounded-lg hover:text-[#f2b229] hover:border-[#f2b229]">Sign up</a>
                        </div>

                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="block sm:hidden text-gray-800 text-2xl"
                        >
                            {menuOpen ? "✕" : "☰"}
                        </button>
                    </div>

                    {menuOpen && (
                        <div className="block sm:hidden bg-white/1 border-t py-3 rounded-b-4xl">

                            <div className="flex bg-white/1 flex-col gap-3 ">
                                <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">View Ideas</a>
                                <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Add Ideas</a>
                                <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Your Ideas</a>
                                <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">About</a>
                                <div className="flex justify-between items-center border-t pt-3 mt-2">
                                    <a href="/pages/login" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">Sign in</a>
                                    <a href="/pages/signup" className="text-gray-800 text-sm font-semibold border border-gray-800 px-4 py-1 rounded-lg hover:text-[#f2b229] hover:border-[#f2b229]">Sign up</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}

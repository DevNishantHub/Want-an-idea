import Image from "next/image";
import Link from "next/link";

export default function Navbar(){

    return (
        <div className="bg-gray-100 font-sans w-full  m-0">
	<div className="bg-white shadow px-15">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-5">
        <div className="ml-2">
          <Link href="/"><Image
                src="logo.svg"   // path inside /public
                alt="Logo"
                className="w-9 h-9 object-contain"
            /></Link>
        </div>

        <div className="hidden sm:flex sm:items-center pl-20">
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">View Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Add Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Your Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">About</a>
        </div>

        <div className="hidden sm:flex sm:items-center">
          <a href="/login" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Sign in</a>

          <a href="/login" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-[#f2b229]">Sign up</a>
        </div>

        
      </div>
      <div className="block sm:hidden bg-white border-t-2 py-2">
        <div className="flex flex-col">
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">View Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Add Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Your Ideas</a>
          <a href="#" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229]">About</a>
        <div className="flex justify-between items-center border-t-2 pt-2">
            <a href="/login" className="text-gray-800 text-sm font-semibold hover:text-[#f2b229] mr-4">Sign in</a>
            <a href="/login" className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg  hover:text-[#f2b229]">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
}

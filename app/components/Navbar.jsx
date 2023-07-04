"use client";
import React from "react";
import Link from 'next/link'

export default function Navbar({ children }) {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-black z-[2]">
      <div className="py-5 container mx-auto lg:grid lg:grid-cols-2 px-5 lg:px-0 space-y-5 lg:space-y-0 gap-2">
        <h1 className="z-20 font-bold text-xl text-gray-100 col-span-1">
          <Link href={"/"}>Unsplash Api</Link>
        </h1>
        {children}
      </div>
    </nav>
  );
}

'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link"; // Importa Link desde Next.js

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">My Padel App</Link>
        </div>

        {/* Icono de Menú Burger para Mobile/Tablet */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Links para pantallas más grandes */}
        <div className="hidden sm:flex space-x-4">
          <Link href="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link href="/reservas" className="text-gray-700 hover:text-blue-500">
            Reservations
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-500">
            Admin
          </Link>
        </div>

        {/* Botones de autenticación para pantallas más grandes */}
        <div className="hidden sm:flex">
          <Link href="/login" className="mr-2" variant="outline">
            Login
          </Link>
          <Link href="/registro">Register</Link>
        </div>
      </div>

      {/* Menú Responsive para Mobile/Tablet */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link href="/about" className="block text-gray-700 hover:text-blue-500">
              About
            </Link>
            <Link href="/reservas" className="block text-gray-700 hover:text-blue-500">
              Reservations
            </Link>
            <Link href="/admin" className="block text-gray-700 hover:text-blue-500">
              Admin
            </Link>
            <div className="flex flex-col space-y-2 mt-3">
              <Link href="/login" className="w-full">
                Login
              </Link>
              <Link href="/registro" className="w-full">Register</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

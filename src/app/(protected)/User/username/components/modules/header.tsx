"use client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg font-montserrat">
      <div
        className="max-w-7xl mx-auto px-3 py-2
      "
      >
        <div className="flex items-center justify-between">
          <Link
            href="/User/username/Home"
            className="flex flex-col group px-3 py-1 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:shadow-md cursor-pointer"
          >
            <h1 className="text-2xl font-montserrat font-bold text-indigo-400 transition-colors group-hover:text-indigo-300">
              Administración
            </h1>
            <p className="text-lg font-semibold text-gray-300 transition-colors group-hover:text-gray-200">
              Plantel 05 García
            </p>
          </Link>

          <button
            type="button"
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors"
          >
            <LogOutIcon className="w-5 h-5 mr-2" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
}

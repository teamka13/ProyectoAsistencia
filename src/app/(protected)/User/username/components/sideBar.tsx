"use client";

import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoHelpBuoyOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../dashboard/sideBar";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeList, setActiveList] = useState<string | null>(null);

  const handleClick = () => setOpen((prev) => !prev);

  const handleListClick = (listId: string) => {
    setActiveList((prev) => (prev === listId ? null : listId));
    if (!open) setOpen(true);
  };

  return (
    <aside
      className={`h-screen flex flex-col duration-500 bg-gradient-to-b from-gray-900 to-slate-800 border-r-4 border-gray-700 text-white shadow-lg ${
        open ? "w-70" : "w-15"
      }`}
    >
      {/* Header */}
      <div className="px-4 h-20 flex items-center justify-between ">
        <Image
          src="/images/CM.png"
          alt="Logo"
          width={80}
          height={80}
          priority
          className={`transition-all duration-700 ${
            open ? "opacity-100" : "w-0 opacity-0"
          }`}
        />
        <button
          onClick={handleClick}
          className=" rounded-md hover:bg-rose-700 focus:ring-rose-700  focus:ring-4  active:scale-85 active:shadow-inner active:opacity-90 transition-all duration-300"
        >
          <MdMenuOpen
            size={33}
            className={`transition-transform duration-700 ${
              !open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <ul className="flex-1">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="px-3 py-2 mt-3 rounded-md duration-300 cursor-pointer flex flex-col gap-2 relative group hover:bg-blue-600
            focus:ring-emerald-600  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-90 active:shadow-inner active:opacity-90 transition-all "
            onClick={() => handleListClick(item.id)}
          >
            {/* Ícono y etiqueta */}
            <div className="flex items-center gap-1">
              <div className="text-xl">{item.icon}</div>
              <p
                className={`transition-all whitespace-nowrap ${
                  open
                    ? "opacity-100 translate-x-1 duration-500"
                    : "opacity-0 -translate-x-4 duration-100"
                }`}
              >
                {item.label}
              </p>
            </div>

            {/* Tooltip (cuando el menú está contraído) */}
            {!open && (
              <p className="absolute left-full ml-1 px-3 py-1 rounded-md bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                {item.label}
              </p>
            )}

            {/* Submenús */}
            {open && activeList === item.id && (
              <ul
                className="ml-6 pl-2 border-l-2 border-blue-800 space-y-2 overflow-hidden transition-all duration-500 ease-out transform origin-top
                  focus:outline-none focus:ring-2  focus:ring-offset-2 active:scale-98 active:shadow-inner active:opacity-90"
                onClick={(e) => e.stopPropagation()}
              >
                {item.subMenu.map((subItem) => (
                  <li key={subItem.path} onClick={(e) => e.stopPropagation()}>
                    <Link
                      className="px-3 py-1 text-sm hover:bg-green-900 rounded-md cursor-pointer flex items-center gap-2 whitespace-nowrap transition-colors duration-200"
                      href={`/User/username/${subItem.path}`}
                    >
                      {subItem.icon && (
                        <span className="text-lg">{subItem.icon}</span>
                      )}
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pb-4">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">
          <IoHelpBuoyOutline size={30} />
          <div
            className={`transition-all duration-500 whitespace-nowrap overflow-hidden ${
              open ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            <p className="font-semibold">Diego</p>
            <span className="text-xs text-gray-300">
              Administrador principal
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

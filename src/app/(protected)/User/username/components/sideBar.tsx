"use client";
import { useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { IoHelpBuoyOutline } from "react-icons/io5";

import { menuItems } from "../dashboard/sideBar";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  /**const username = "Diego"; Usuario estático para pruebas
  const isActive = (path: string) => pathname?.includes(`/${username}/${path}`);*/

  const [open, setOpen] = useState(false);

  //*controla que el panel se ahabra*/

  const handleClick = () => setOpen(!open);
  const [activeList, setActiveList] = useState<string | null>(null);

  //*controla que la lista se habra*/

  const handleListClick = (listId: string) => {
    setActiveList(activeList === listId ? null : listId);
    if (!open) setOpen(true);

    //*se declara listId como string y se compara que listID se abrió*/
  };

  return (
    <aside
      className={` h-screen  flex flex-col duration-500 	bg-slate-900  border-r-4 border-black text-white  ${
        open ? "w-70" : "w-15"
      }`}
    >
      {/*header*/}
      <div className="px-3 h-20 flex items-center justify-between ">
        <Image
          src="/images/CM.png" // Asegúrate de que esté en /public/images/
          alt="Logo"
          width={80}
          height={80}
          priority // Prioriza la carga en el render inicial
          className={`transition-all duration-700 ${
            open ? " opacity-100" : "w-0 opacity-0"
          }`}
        />
        <div
          onClick={handleClick}
          className=" rounded-md hover:bg-rose-700 hover:text-white
  duration-500"
        >
          <MdMenuOpen
            size={34}
            className={` transition-transform duration-700 text-white ${
              !open && "rotate-180"
            }`}
          />
        </div>
      </div>

      {/*body*/}
      <ul className="flex-1  ">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              className="px-4 py-2 mt-4 	hover:bg-[#00566e]/80 hover:text-white rounded-md duration-300 cursor-pointer flex flex-col gap-2 relative group"
              onClick={() => handleListClick(item.id)}
            >
              <div className="flex items-center gap-3">
                <div>{item.icon}</div>
                <p
                  className={`${
                    !open
                      ? "w-0 opacity-0 -translate-x-1 duration-100"
                      : "w-full opacity-100 translate-x-1 duration-500"
                  } whitespace-nowrap transition-all`}
                >
                  {item.label}
                </p>
              </div>

              {/* Tooltip (aparece al hacer hover cuando el menú está contraído) */}
              {!open && (
                <p
                  className="
        absolute left-full ml-1 px-5 py-1 rounded-md bg-white text-black shadow-md 
        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
        transition-all duration-300 whitespace-nowrap transform "
                >
                  {item.label}
                </p>
              )}
              {/*controla los submenus*/}
              {open && activeList === item.id && (
                <ul
                  className="ml-6 pl-2 border-l-2 space-y-1 overflow-hidden transition-all duration-500 ease-out transform origin-top"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.subMenu.map((subItem) => (
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      key={subItem.path}
                    >
                      <Link
                        className="px-2 py-1.5 text-sm hover:bg-cyan-700 rounded-2xl cursor-pointer whitespace-nowrap flex items-center gap-2"
                        href={`/User/username/${subItem.path}`}
                      >
                        {/* Subicon si existe */}
                        {subItem.icon && (
                          <span className="text-white">{subItem.icon}</span>
                        )}
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto pb-4">
        <div className="flex items-center gap-2 px-4 py-2">
          <div>
            <IoHelpBuoyOutline size={30} />
          </div>
          <div
            className={`leading-5 ${
              !open && "w-0 translate-x-1"
            } duration-500 overflow-hidden `}
          >
            <p>Diego</p>
            <span className="text-xs">Administrador principal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

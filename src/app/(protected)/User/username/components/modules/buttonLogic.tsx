import { Info, BookOpen, Settings } from "lucide-react";
import { oswald, poppins } from "@root/src/components/ui/fonts";

const menuItems = [
  {
    id: "personal",
    icon: <Info size={20} />,
    label: "Información Personal",
  },
  {
    id: "departamento",
    icon: <BookOpen size={20} />,
    label: "Información Académica",
  },
  {
    id: "logs",
    icon: <Settings size={20} />,
    label: "Información de usuario",
  },
];
type Props = {
  hanldeList: (clickedId: string) => void;
};

export function ButtonControler({ hanldeList }: Props) {
  return (
    <div>
      <ul>
        {menuItems.map((item) => (
          <li
            className=" mt-3 mb-3 p-1 hover:bg-gray-50 rounded-xl hover:shadow-md 
             shadow-gray-600  duration-200 transition-all cursor-pointer flex flex-col "
            key={item.id}
            onClick={() => hanldeList(item.id)}
          >
            <div className="flex cursor-pointer p-2">
              <div className=" flex items-center justify-center text-blue-900">
                {item.icon}
              </div>
              <h1 className={`text-2xl font-semibold pl-4 ${oswald.variable}`}>
                {item.label}
              </h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

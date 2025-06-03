import {
  FaClipboardList,
  FaUserEdit,
  FaCalendarDay,
  FaCalendarAlt,
  FaUtensils,
  FaUserGraduate,
  FaSearch,
  FaUserPlus,
  FaBookOpen,
  FaBug,
} from "react-icons/fa";

import { IoHelpBuoyOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

export const menuItems = [
  {
    id: "registro",
    icon: <FaUserEdit size={30} />,
    label: "Registro de asistencia",
    subMenu: [
      {
        label: "Captura Entrada",
        path: "Captura/Entrada",
        icon: <FaCalendarDay />,
      },
      {
        label: "Captura Comedor",
        path: "Captura/Comedor",
        icon: <FaUtensils />,
      },
    ],
  },
  {
    id: "alumns",
    icon: <FaUserGraduate size={30} />,
    label: "Estudiantes",
    subMenu: [
      {
        label: "Buscar alumno",
        path: "Alumnos/Buscar",
        icon: <FaSearch />,
      },
      {
        label: "Registrar Alumnos",
        path: "Alumnos/Registrar",
        icon: <FaUserPlus />,
      },
    ],
  },
  {
    id: "reportesAsistencia",
    icon: <FaClipboardList size={30} />,
    label: "Reportes Asistencia",
    subMenu: [
      {
        label: "Asistencia Diaria",
        path: "Asistencia/Diario",
        icon: <FaCalendarDay />,
      },
      {
        label: "Asistencia Mensual",
        path: "Asistencia/Mes",
        icon: <FaCalendarAlt />,
      },
    ],
  },
  {
    id: "reportesSalida",
    icon: <HiOutlineLogout size={30} />,
    label: "Reportes de Salida",
    subMenu: [
      {
        label: "Salida Diaria",
        path: "Salida/Diario",
        icon: <FaCalendarDay />,
      },
      {
        label: "Salida Mensual",
        path: "Salida/Mes",
        icon: <FaCalendarAlt />,
      },
    ],
  },
  {
    id: "reportesComedor",
    icon: <FaUtensils size={30} />,
    label: "Reportes de Comedor",
    subMenu: [
      {
        label: "Comedor Diario",
        path: "Comedor/Diario",
        icon: <FaCalendarDay />,
      },
      {
        label: "Comedor Mensual",
        path: "Comedor/Mes",
        icon: <FaCalendarAlt />,
      },
    ],
  },
  {
    id: "soporte",
    icon: <IoHelpBuoyOutline size={30} />,
    label: "Ayuda y soporte",
    subMenu: [
      {
        label: "Manual de Usuario",
        path: "support/usersManual",
        icon: <FaBookOpen />,
      },
      {
        label: "Formulario de Reporte",
        path: "support/formReport",
        icon: <FaBug />,
      },
    ],
  },
];

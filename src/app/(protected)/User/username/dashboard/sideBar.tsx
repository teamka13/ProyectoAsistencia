import {
  ClipboardList,
  UserCog,
  CalendarDays,
  CalendarCheck,
  Utensils,
  GraduationCap,
  Search,
  UserPlus,
  BookOpen,
  Bug,
  HelpCircle,
  LogOut,
  ArrowRight,
  LogIn,
  Send,
} from "lucide-react";

export const menuItems = [
  {
    id: "registro",
    icon: <UserCog size={30} />,
    label: "Registro de asistencia",
    color: "blue-600",
    subMenu: [
      {
        label: "Captura Entrada",
        path: "Captura/Entrada",
        icon: <CalendarDays size={20} />,
        color: "blue-500",
      },
      {
        label: "Captura Comedor",
        path: "Captura/Comedor",
        icon: <Utensils size={20} />,
        color: "blue-400",
      },
      {
        label: "Captura Salida",
        path: "Captura/Salida",
        icon: <ArrowRight size={20} />,
        color: "blue-300",
      },
    ],
  },
  {
    id: "alumns",
    icon: <GraduationCap size={30} />,
    label: "Personal y Alumnos",
    color: "purple-600",
    subMenu: [
      {
        label: "Busqueda de Personal",
        path: "Alumnos/Buscar",
        icon: <Search size={20} />,
        color: "purple-500",
      },
      {
        label: "Registrar Alumnos",
        path: "Alumnos/Registrar",
        icon: <UserPlus size={20} />,
        color: "purple-400",
      },
    ],
  },
  {
    id: "reportesAsistencia",
    icon: <ClipboardList size={30} />,
    label: "Reportes Asistencia",
    color: "green-600",
    subMenu: [
      {
        label: "Asistencia Diaria",
        path: "Asistencia/Diario",
        icon: <CalendarDays size={20} />,
        color: "green-500",
      },
      {
        label: "Asistencia Mensual",
        path: "Asistencia/Mes",
        icon: <CalendarCheck size={20} />,
        color: "green-400",
      },
    ],
  },
  {
    id: "reportesSalida",
    icon: <LogOut size={30} />,
    label: "Reportes de Salida",
    color: "red-600",
    subMenu: [
      {
        label: "Salida Diaria",
        path: "Salida/Diario",
        icon: <CalendarDays size={20} />,
        color: "red-500",
      },
      {
        label: "Salida Mensual",
        path: "Salida/Mes",
        icon: <CalendarCheck size={20} />,
        color: "red-400",
      },
    ],
  },
  {
    id: "reportesComedor",
    icon: <Utensils size={30} />,
    label: "Reportes de Comedor",
    color: "yellow-600",
    subMenu: [
      {
        label: "Comedor Diario",
        path: "Comedor/Diario",
        icon: <CalendarDays size={20} />,
        color: "yellow-500",
      },
      {
        label: "Comedor Mensual",
        path: "Comedor/Mes",
        icon: <CalendarCheck size={20} />,
        color: "yellow-400",
      },
    ],
  },
  {
    id: "soporte",
    icon: <HelpCircle size={30} />,
    label: "Ayuda y soporte",
    color: "gray-600",
    subMenu: [
      {
        label: "Manual de Usuario",
        path: "support/usersManual",
        icon: <BookOpen size={20} />,
        color: "gray-500",
      },
      {
        label: "Formulario de Reporte",
        path: "Soporte/formReport",
        icon: <Bug size={20} />,
        color: "gray-400",
      },
    ],
  },
  {
    id: "telegram",
    icon: <Send size={30} />,
    label: "Telegram Mensajes",
    color: "cyan-600",
    subMenu: [
      {
        label: "Notificaciones",
        path: "Telegram",
        icon: <LogIn size={20} />,
        color: "cyan-500",
      },
    ],
  },
];

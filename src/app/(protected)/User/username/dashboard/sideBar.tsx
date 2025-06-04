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
  XCircle,
  AlertTriangle,
} from "lucide-react";

export const menuItems = [
  {
    id: "registro",
    icon: <UserCog size={30} />,
    label: "Registro de asistencia",
    subMenu: [
      {
        label: "Captura Entrada",
        path: "Captura/Entrada",
        icon: <CalendarDays size={20} />,
      },
      {
        label: "Captura Comedor",
        path: "Captura/Comedor",
        icon: <Utensils size={20} />,
      },
      {
        label: "Captura Salida",
        path: "Captura/Salida",
        icon: <ArrowRight size={20} />,
      },
    ],
  },
  {
    id: "alumns",
    icon: <GraduationCap size={30} />,
    label: "Personal y Alumnos",
    subMenu: [
      {
        label: "Buscaqueda de Personal",
        path: "Alumnos/Buscar",
        icon: <Search size={20} />,
      },
      {
        label: "Registrar Alumnos",
        path: "Alumnos/Registrar",
        icon: <UserPlus size={20} />,
      },
    ],
  },
  {
    id: "reportesAsistencia",
    icon: <ClipboardList size={30} />,
    label: "Reportes Asistencia",
    subMenu: [
      {
        label: "Asistencia Diaria",
        path: "Asistencia/Diario",
        icon: <CalendarDays size={20} />,
      },
      {
        label: "Asistencia Mensual",
        path: "Asistencia/Mes",
        icon: <CalendarCheck size={20} />,
      },
    ],
  },
  {
    id: "reportesSalida",
    icon: <LogOut size={30} />,
    label: "Reportes de Salida",
    subMenu: [
      {
        label: "Salida Diaria",
        path: "Salida/Diario",
        icon: <CalendarDays size={20} />,
      },
      {
        label: "Salida Mensual",
        path: "Salida/Mes",
        icon: <CalendarCheck size={20} />,
      },
    ],
  },
  {
    id: "reportesComedor",
    icon: <Utensils size={30} />,
    label: "Reportes de Comedor",
    subMenu: [
      {
        label: "Comedor Diario",
        path: "Comedor/Diario",
        icon: <CalendarDays size={20} />,
      },
      {
        label: "Comedor Mensual",
        path: "Comedor/Mes",
        icon: <CalendarCheck size={20} />,
      },
    ],
  },
  {
    id: "soporte",
    icon: <HelpCircle size={30} />,
    label: "Ayuda y soporte",
    subMenu: [
      {
        label: "Manual de Usuario",
        path: "support/usersManual",
        icon: <BookOpen size={20} />,
      },
      {
        label: "Formulario de Reporte",
        path: "support/formReport",
        icon: <Bug size={20} />,
      },
    ],
  },
  {
    id: "telegram",
    icon: <Send size={30} />,
    label: "Telegram Mensajes",
    subMenu: [
      {
        label: "Notificar Entrada",
        path: "telegram/entrada",
        icon: <LogIn size={20} />,
      },
      {
        label: "Notificar Salida",
        path: "telegram/salida",
        icon: <LogOut size={20} />,
      },
      {
        label: "Ausencia Detectada",
        path: "telegram/noAsistio",
        icon: <XCircle size={20} />,
      },
      {
        label: "Salida No Registrada",
        path: "telegram/sinSalida",
        icon: <AlertTriangle size={20} />,
      },
    ],
  },
];

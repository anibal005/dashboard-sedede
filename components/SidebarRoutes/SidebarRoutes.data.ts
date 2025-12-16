import {
  BarChart4,
  PanelsTopLeft,
  Settings,
  ShieldCheck,
  CircleHelpIcon,
  Calendar,
  Award,
} from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Award,
    label: "Deportistas",
    href: "/athletes",
  },
  {
    icon: Calendar,
    label: "Calendario",
    href: "/tasks",
  },
];

export const dataToolsSidebar = [
  {
    icon: CircleHelpIcon,
    label: "Preguntas",
    href: "/faqs",
  },
  {
    icon: BarChart4,
    label: "Analiticas",
    href: "/analytics",
  },
];

export const dataSupportSidebar = [
  {
    icon: Settings,
    label: "Configuración",
    href: "/setting",
  },
  {
    icon: ShieldCheck,
    label: "Seguridad",
    href: "/security",
  },
];

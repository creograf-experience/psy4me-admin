import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Perm_identity from "@material-ui/icons/PermIdentity";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Money from "@material-ui/icons/Money";
import Settings from "@material-ui/icons/Settings";
import Schedule from "@material-ui/icons/Schedule";
import Star from "@material-ui/icons/Star";

const routes = [
  {
    path: "/",
    sidebarName: "Главная",
    icon: Dashboard
  },
  {
    path: "/clients",
    sidebarName: "Клиенты",
    icon: Person
  },
  {
    path: "/psychologists",
    sidebarName: "Психологи",
    icon: Perm_identity
  },
  {
    path: "/payments-from-clients",
    sidebarName: "Платежи от клиентов",
    icon: AttachMoney
  },
  {
    path: "/payments-to-psychologists",
    sidebarName: "Выплаты психологам",
    icon: Money
  },
  {
    path: "/settings",
    sidebarName: "Настройки",
    icon: Settings
  },
  {
    path: "/schedule",
    sidebarName: "Расписание",
    icon: Schedule
  },
  {
    path: "/ratings",
    sidebarName: "Оценки",
    icon: Star
  }
];

export default routes;

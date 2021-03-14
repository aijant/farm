import React from "react";
import ReactDOM from "react-dom";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import { Menubar } from "primereact/menubar";

const NavBar = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      items: [
        {
          label: "User",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Sign out",
              icon: "pi pi-fw pi-sign-out",
            },
            {
              label: "Sign in",
              icon: "pi pi-fw pi-sign-in",
            },
          ],
        },
      ],
    },
    {
      label: "Animals",
      icon: "pi pi-fw pi-th-large",
      items: [
        {
          label: "Cows",
          icon: "pi pi-fw pi-circle-on",
        },
        {
          label: "Sheaps",
          icon: "pi pi-fw pi-circle-on",
        },
        {
          label: "Hourses",
          icon: "pi pi-fw pi-circle-on",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="../saveanimals.png"
      onError={(e) =>
        (e.target.src =
          "https://i.pinimg.com/originals/48/92/22/489222fa4f78df5c40c220a5d32fa338.png")
      }
      height="40"
      className="p-mr-2"
    ></img>
  );

  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} />
      </div>
    </div>
  );
};

export default NavBar;

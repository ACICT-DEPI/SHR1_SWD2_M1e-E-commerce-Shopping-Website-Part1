import React from "react";
import { Menu } from "primereact/menu"; // PrimeReact Menu component

const DropdownList = ({ handleSignOut }) => {
  const items = [
    {
      label: "Personal Profile",
      icon: "pi pi-user",
      command: () => console.log("Personal Profile clicked"),
    },
    {
      label: "Change Password",
      icon: "pi pi-lock",
      command: () => console.log("Change Password clicked"),
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: handleSignOut, // Trigger the sign out action
    },
  ];

  return <Menu model={items} popup={false} className="w-full" />;
};

export default DropdownList;

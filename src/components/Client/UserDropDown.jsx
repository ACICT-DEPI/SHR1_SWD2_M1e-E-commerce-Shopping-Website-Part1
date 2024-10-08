// DropdownMenu.js
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import {  useNavigate } from 'react-router-dom';

const UserDropdown = ({ username }) => {
    
    const navigate = useNavigate();
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => navigate('/profile'),
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        navigate('/logout')
      },
    },
  ];

  return (
    <div className="dropdown-menu">
      <Dropdown
        value={username}
        options={items}
        onChange={(e) => e.value.command()}
        placeholder="Hamis Hisham"
        className="w-full"
        label={username}
      />
    </div>
  );
};

export default UserDropdown;

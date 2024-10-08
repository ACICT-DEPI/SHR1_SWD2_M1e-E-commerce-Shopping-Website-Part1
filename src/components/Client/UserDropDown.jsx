// UserDropdown.js
import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const UserDropdown = ({ username }) => {
  const menu = useRef(null);
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
      command: () => navigate('/logout'),
    },
  ];

  return (
    <div className="user-dropdown">
      <Button
        label={username}
        icon="pi pi-angle-down"
        onClick={(event) => menu.current.toggle(event)}
        className="p-button-text"
      />
      <Menu model={items} popup ref={menu} />
    </div>
  );
};

export default UserDropdown;

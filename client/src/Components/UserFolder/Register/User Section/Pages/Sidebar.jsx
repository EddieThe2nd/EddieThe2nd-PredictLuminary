import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarData } from '../Functions/SidebarData';
//import './Css/Sidebar.css'; //

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='Sidebar'>
      <ul className="SidebarList">
        {SidebarData.map((value, key) => (
          <li
            key={key}
            className="ListRow"
            id = {location.pathname === value.link ? 'active' : ''}
            onClick={() => navigate(value.link)}
          >
            <div id='SidebarIcon'>{value.icon}</div>
            <div id='SidebarTitle'>{value.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';

import './Sidebar.css'
import UserSidebar from './UserSidebar';

const Sidebar = () => {

    const location = useLocation()

    return (
        <div>
            {
                location.pathname === '/users'
                    ?
                    <UserSidebar />
                    :
                    <ProjectSidebar />
            }
        </div>
    );
};

export default Sidebar;
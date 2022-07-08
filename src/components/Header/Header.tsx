import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <Link to="/users">Users</Link>
            <Link to="/projects">Projects</Link>
        </div>
    );
};

export default Header;
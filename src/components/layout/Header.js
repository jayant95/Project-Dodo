import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <Link style={titleStyle} to="/"><h1>Piano Circle</h1></Link>
            <Link style={linkStyle} to="/register">Register</Link> | <Link style={linkStyle} to="/login">Login</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem'
}

const titleStyle = {
    textDecoration: 'none',
    color: '#fff'

}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;

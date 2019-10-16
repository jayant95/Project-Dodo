import React from 'react';
import { Link } from 'react-router-dom';
import { thisExpression } from '@babel/types';


// let link = "";
// if (this.props.auth) {
//     link = "Profile"
// } else {
//     link = "Login"
// }

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false
        }
    }

    check = (auth) => {
        if (auth) {
            return "Login";
        } else {
            return "Profile";
        }
    }

    handleLogout = () => {
        this.props.loginAuth(false);
    }
 
    render() {
        if (this.props.auth) {
            return (
                <header style={headerStyle}>
                <Link style={titleStyle} to="/"><h1>Piano Circle</h1></Link>
                 <Link style={linkStyle} to="/register">Profile</Link> | <span style={spanStyle} onClick={this.handleLogout}>Logout</span>
                 
                 </header>
            )
        }
        return (
            <header style={headerStyle}>
                <Link style={titleStyle} to="/"><h1>Piano Circle</h1></Link>
                <Link style={linkStyle} to="/register">Register</Link> | <Link style={linkStyle} to="/login">Login</Link>      
            </header>
        )
    }

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

const spanStyle = {
    cursor: 'pointer'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;

import React, { Component } from 'react';
import {apiConfig} from "../../config/api";

// Nav elements for reactstrap:
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Header = (props) => {

    const logout = () => {
        localStorage.setItem('jwtToken', '')
        window.location = '/login'
    }
    
    return (
        <Navbar color="dark" dark expand="md">
            <div className="container">
                <NavbarBrand href="/Dashboard">SOLITUDE</NavbarBrand>
            </div>
            <div className="navbar-nav ml-auto">
                <div navbar>
                    <Nav className="ml-auto logout-label" navbar>
                        <NavItem>
                            <NavLink href={apiConfig.get('apiUrl') + '/admin'}>Admin</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/logout" onClick={()=>{ logout() }}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </div>
        </Navbar>
    )

}

export default Header;
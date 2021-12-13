import React from 'react';
import { Nav, Bars, NavLink, NavMenu, NavLinkLogo } from './NavbarElements';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
    //FaGithub
    return(
        <div>
            <Nav>
                <NavLinkLogo to={"/"}>
                    <FaGithub style={{fontSize: '50px'}}/>
                </NavLinkLogo>
                <Bars />
                <NavMenu>
                    <NavLink to={"/about"} activeStyle>
                        About
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};

export default Navbar
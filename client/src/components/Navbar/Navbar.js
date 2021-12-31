import React from 'react';
import {Bars, NavLink, NavMenu} from './NavbarElements';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
    //FaGithub
    return(
        <div>
            <div className="bg-gray-850 h-20 flex justify-between z-10">
                <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0" href={"/"}>
                    <FaGithub className="text-5xl text-white"/>
                </a>
                <Bars />
                <NavMenu>
                    <NavLink to={"/about"} activeStyle>
                        About
                    </NavLink>
                </NavMenu>
            </div>
        </div>
    );
};

export default Navbar;

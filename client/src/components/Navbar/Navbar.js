import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Bars } from './NavbarElements'

const Navbar = () => {
    //FaGithub
    return(
        <div>
            <div className="bg-gray-github h-20 flex justify-between z-10">
                <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0" href={"/"}>
                    <FaGithub className="text-5xl text-white"/>
                </a>
                {/*<div className="hidden text-white md:block md:absolute md:top-0 md:right-0 md:text-7xl md:cursor-pointer md:translate-y-3/4">*/}
                {/*<Bars />*/}
                <div className="text-white items-center">
                    <div className="flex items-center mr-5 text-2xl">
                        <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0 text-white" href={"/about"}>
                            About
                        </a>
                        <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0 text-white" href={"/results"}>
                            Results
                        </a>
                    </div>
                </div>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Navbar;
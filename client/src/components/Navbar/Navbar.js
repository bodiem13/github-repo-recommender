import React from 'react';
import { FaGithub } from 'react-icons/fa';

//Navbar for navigation to additional pages and back to home screen
const Navbar = () => {
    return(
        <div>
            <div className="bg-gray-github h-20 flex justify-between z-10 items-center">
                <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0" href={"/"}>
                    <FaGithub className="text-5xl text-white"/>
                </a>
                <div className="text-white items-center">
                    <div className="flex items-center mr-5 text-2xl">
                        <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0 text-white hover:text-gray-400" href={"/about"}>
                            Results
                        </a>
                        <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0 text-white hover:text-gray-400" href={"/results"}>
                            About
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
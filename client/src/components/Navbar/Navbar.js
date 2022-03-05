import React from 'react';
import { FaGithub } from 'react-icons/fa';

//Navbar for navigation to additional pages and back to home screen
const Navbar = () => {
    //list of navbar tabs to loop through when creating hyperlink tags
    const navbarTabs = ['Results', 'Contact']
    const navbarTabsTags = []

    for (let tab of navbarTabs) {
        const tabLink = "/"+tab;
        navbarTabsTags.push(<a className="flex items-center no-underline h-full cursor-pointer px-4 py-0 text-white hover:underline" href={tabLink}>{tab}</a>)
    }
    return(
        <div>
            <div className="bg-gray-github h-20 flex justify-between z-10 items-center">
                <a className="flex items-center no-underline h-full cursor-pointer px-4 py-0" href={"/"}>
                    <FaGithub className="text-5xl text-white"/>
                </a>
                <div className="text-white items-center">
                    <div className="flex items-center mr-5 text-2xl">
                    {navbarTabsTags}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
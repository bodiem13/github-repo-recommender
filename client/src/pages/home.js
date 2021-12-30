import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import {HomeContainer} from '../components/HomeContainer/HomeElements'
import SearchBar from '../components/SearchBar/SearchBar'
//import tailwindcss from 'tailwindcss';


const Home = () => {
    return(
        <div style={HomeContainer}>
            <Navbar />
            <h1 className="text-3xl font-bold underline text-red-500">
                Header using tailwind css
            </h1>
            {/*To add data options to the search bar, add a second prop for data */}
            <SearchBar placeholder = "Enter a GitHub Repository Url..."/>
        </div> 
    );   
};

export default Home
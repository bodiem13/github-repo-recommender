import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar'

const Home = () => {
    return(
        <div className="justify-center align-middle h-32 bg-stone-700">
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
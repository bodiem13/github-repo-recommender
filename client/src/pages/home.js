import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import {HomeContainer} from '../components/HomeContainer/HomeElements'
import SearchBar from '../components/SearchBar/SearchBar'


const Home = () => {
    const [input, setInput] = useState('');

    const updateInput = async (input) => {
        setInput('This is my manual set of input');
        console.log("This function updateInput is getting called.");
    };


    return(
        <div style={HomeContainer}>
            <Navbar />
            <h1>Test</h1>
            {/*To add data options to the search bar, add a second prop for data */}
            <SearchBar placeholder = "Enter a GitHub Repository Url..."/>
        </div> 
    );   
};

export default Home
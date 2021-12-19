import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {HomeContainer} from '../components/HomeContainer/HomeElements'
import SearchBar from '../components/SearchBar/SearchBar'


const Home = () => {
    return(
        <div style={HomeContainer}>
            <Navbar />
            <h1>Test</h1>
            <SearchBar />
        </div> 
    );   
};

export default Home
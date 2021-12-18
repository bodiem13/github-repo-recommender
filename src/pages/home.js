import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {HomeContainer} from '../components/HomeContainer/HomeElements'


const Home = () => {
    return(
        <div style={HomeContainer}>
            <Navbar/>
            <h1>Test</h1>
        </div> 
    );   
};

export default Home
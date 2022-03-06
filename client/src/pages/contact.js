import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import ContactPage from '../components/ContactPage/ContactPage';
import ContactCard from '../components/ContactCard/ContactCard';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <ContactPage />
            <ContactCard />
        </div>
    )
}

export default Contact
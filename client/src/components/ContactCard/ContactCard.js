import React, {useState, useEffect} from 'react';
import {Card} from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';

const ContactCard = () => {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clicked) {
            window.location.assign('https://github.com/bodiem13/github-repo-recommender');
        }
    }, [clicked]);
    return(
        <div className="d-flex pt-10 pl-5 pr-5 justify-evenly">
            <Card border="primary">
                <Card.Body>
                    <Card.Title className="text-center font-bold !text-4xl">Contact</Card.Title>
                    <Card.Text className="text-center">
                        Please checkout the Github repository for details surrounding the development of this project
                    </Card.Text>
                    <div className="justify-evenly flex pt-7 pb-7">
                        <button type="button" className="btn btn-dark w-2/5 text-2xl" onClick={() => setClicked(true)}><FaGithub className="text-2xl text-white inline-block"/>Github Repo</button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ContactCard;
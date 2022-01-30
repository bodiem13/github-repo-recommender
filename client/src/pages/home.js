import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar'
import DataList from '../components/DataList/DataList'
import Form from '../components/Form/Form'

const Home = () => {
    //creates my state and use state
    const [articles, setArticles] = useState([])

    const [editArticle, setEditArticle] = useState(null)

    //use useEffect to fetch the data
    useEffect(() => {
        //routes to api
        //can pass data
        fetch('http://127.0.0.1:8000/api/articles/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token a6d0b482c2f311bea80b5375eeee5413ce47bb30'
            }
        })
        //get promise from api call
        .then(resp => resp.json())
        //set response to articles
        .then(resp => setArticles(resp))
        //error handling
        .catch(error => console.log(error))
    }, [])

    const editBtn = (article) => {
        setEditArticle(article)
    }
    return(
        <div className="justify-center align-middle h-32">
            <Navbar />
            {/*To add data options to the search bar, add a second prop for data */}
            <SearchBar placeholder = "Enter a GitHub Repository Url..."/>
            <h1>Django responses</h1>
            {/*Send articles as prop to the DataList component*/}
            <DataList articles = {articles} editBtn = {editBtn}/>
            <Form article = {editArticle}/>
        </div> 
    );   
};

export default Home
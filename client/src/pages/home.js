import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar'
import DataList from '../components/DataList/DataList'
import Form from '../components/Form/Form'
import { FaArrowAltCircleDown, FaSleigh } from 'react-icons/fa';

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
    
    const updatedInformation = (article) => {
        const new_article = articles.map(myarticle => {
            if (myarticle.id === article.id){
                return article;
            }
            else {
                return myarticle;
            }
        })
        setArticles(new_article)
    }

    const articleForm = (repoUrl) => {
        //setEditArticle({title: '', description: ''})
        console.log("Printing repoUrl from home page")
        console.log(repoUrl)
    }

    const insertedInformation = (article) => {
        const new_articles = [...articles, article]
        setArticles(new_articles)
    }

    const deleteBtn = (article) => {
        const new_articles = articles.filter(myarticle => {
            if (myarticle.id === article.id){
                return false
            }
            else {
                return true
            }
        })

        setArticles(new_articles)
    }
    return(
        <div className="justify-center align-middle h-32">
            <Navbar />
            {/*To add data options to the search bar, add a second prop for data */}
            <SearchBar placeholder = "Enter a GitHub Repository Url..." articleForm = {articleForm} insertedInformation = {insertedInformation}/>
            {/*<h1>Django responses</h1>*/}
            {/*Send articles as prop to the DataList component*/}
            {/*<DataList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn}/>*/}
            {/*Check if we have anything in editArticle. If so, return form. Else null */}
            {/*{editArticle ? <Form article = {editArticle} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/>: null}*/}
        </div> 
    );   
};

export default Home
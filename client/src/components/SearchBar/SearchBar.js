import React, {useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import APIService from '../../APIService/APIService'
import axios from 'axios';

//props of placeholder and repoUrl are passed to the component
const SearchBar = (props) => {
    const [repoUrl, setRepoUrl] = useState("");
    const [userEnteredUrl, setUserEnteredUrl] = useState("");

    const handleRepoUrl = (event) => {
        console.log("handleRepoUrl function has been successfully ran!")
        const enteredUrl = event.target.value;
        setRepoUrl(enteredUrl);
        console.log(event);
    }

    const captureInput = () => {
        console.log("Repository URL has been captured.")
        console.log(repoUrl);
        props.articleForm(repoUrl)
        const userMessage = "The following user input has been handled: " + repoUrl
        const mySplitUrl = repoUrl.split("github.com/")
        let apiEnd = mySplitUrl[1]
        const apiUrl = "https://api.github.com/repos/" + apiEnd
        console.log(apiUrl)
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            return data
        })
        const title = repoUrl
        const description = apiUrl
        console.log(typeof data);
        APIService.InsertArticle({title, description})
        .then(resp => props.insertedInformation(resp))

        setUserEnteredUrl(<p style={{textAlign: "left"}}>{userMessage}</p>)
    }
    // const insertArticle = () => {
    //     APIService.InsertArticle({title, description})
    //     .then(resp => props.insertedInformation(resp))
    // }
    return(
        <div>
            <div className="flex items-center justify-center pt-6">
                <div className="flex border-2 rounded">
                    <input type="search" className="px-4 py-2 w-96 cursor-text border-0 outline-none" value={repoUrl} placeholder={props.placeholder} onChange={handleRepoUrl}/>
                    <button className="flex items-center justify-center px-4 border-l cursor-pointer hover:outline-black" type="submit" onClick={() => captureInput()}>
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor">
                            <SearchIcon />
                        </svg>
                    </button>
                </div>
            </div>
            {userEnteredUrl}
        </div>
    );
};
export default SearchBar;


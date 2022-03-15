import React, {useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import APIService from '../../APIService/APIService'
import axios from 'axios';
import history from '../History/History'
import MakeAPiCalls from '../MakeApiCalls/MakeApiCalls'

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
        history.push('/Results')
        const userMessage = "The following user input has been handled: " + repoUrl
        let apiUrl = MakeAPiCalls.buildApiUrl(repoUrl)
        console.log("Inside search bar.js")
        console.log(apiUrl)
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(typeof(data))
            // # has_issues           4634.716541 Done
            // # has_wiki            -2568.089355 Done
            // # has_projects        -1783.853471 Done
            // # forks_count             0.145594 Done
            // # open_issues_count       3.807028 Done
            // # subscribers_count      22.076769 Done
            // # num_topics            346.543219 
            // # num_branches           43.965901
            let stargazers_count =  data['stargazers_count']
            let forks_count =  data['forks_count']
            let open_issues_count = data['open_issues']
            let subscribers_count = data['subscribers_count']
            let has_issues = data['has_issues']
            let has_wiki = data['has_wiki']
            let has_projects = data['has_projects']
            let full_name = data['full_name']
            console.log(stargazers_count)
            console.log(has_issues)
            console.log(has_wiki)
            console.log(has_projects)
            console.log(forks_count)
            console.log(open_issues_count)
            console.log(subscribers_count)
            // console.log(num_topics)
            // console.log(num_branches)

            setUserEnteredUrl(
                <div>
                    <h1 style={{textAlign: "left"}}>{data['full_name']}</h1>
                    <p style={{textAlign: "left"}}>{"Number of forks: " + data['forks_count']}</p>
                    <p style={{textAlign: "left"}}>{"Number of open issues: " + data['open_issues']}</p>
                    <p style={{textAlign: "left"}}>{"Number of watchers: " + data['watchers_count']}</p>
                </div>
                )
            console.log(data);
            return data
        })
        const title = repoUrl
        const description = apiUrl
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


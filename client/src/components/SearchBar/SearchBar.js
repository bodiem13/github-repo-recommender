import React, {useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import APIService from '../../APIService/APIService'
import axios from 'axios';
import history from '../History/History'
import MakeAPiCalls from '../MakeApiCalls/MakeApiCalls'
import { useLinkClickHandler } from 'react-router-dom';

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
    
    const checkNumStars = (stargazers_count, num_stars_from_model) => {
        if (num_stars_from_model>stargazers_count) {
          return <tr>
                    <td>Number of Stars Predicted</td>
                    <td>{num_stars_from_model}</td>
                    <td>Your repo is very popular!!</td>
                </tr>;
        } else {
          return <tr>
                    <td>Number of Stars Predicted</td>
                    <td>{num_stars_from_model}</td>
                    <td>We were expecting more stars!</td>
                </tr>;
        }
      }
    

    const captureInput = () => {
        history.push('/Results')
        const userMessage = "The following user input has been handled: " + repoUrl
        let apiUrl = MakeAPiCalls.buildApiUrl(repoUrl)
        console.log("Inside search bar.js")
        console.log(apiUrl)
        let apiData = MakeAPiCalls.fetchApiData(apiUrl)
        let apiBranchesUrl = MakeAPiCalls.buildBranchesApiUrl(repoUrl)
        console.log("Below is the data printed from the async function call")
        console.log(apiData)
        console.log("Above is data from async")
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
            // # num_branches           43.965901 Done
            let stargazers_count =  data['stargazers_count']
            let forks_count =  data['forks_count']
            let open_issues_count = data['open_issues']
            let subscribers_count = data['subscribers_count']
            let has_issues = data['has_issues']
            let has_wiki = data['has_wiki']
            let has_projects = data['has_projects']
            let num_topics = data['topics'].length
            let full_name = data['full_name']
            console.log(stargazers_count)
            console.log(has_issues)
            console.log(has_wiki)
            console.log(has_projects)
            console.log(forks_count)
            console.log(open_issues_count)
            console.log(subscribers_count)
            fetch(apiBranchesUrl)
            .then(res => res.json())
            .then(mydata => {
                let num_branches = mydata.length;
                let num_stars_from_model = 4634.716541*has_issues + -2568.089355*has_wiki + -1783.853471*has_projects +
                0.145594*forks_count + 3.807028*open_issues_count + 22.076769*subscribers_count + 346.543219*num_topics + 43.965901*num_branches
                console.log("Here are the number of stars")
                console.log(num_stars_from_model)
                console.log("This is the num branches")
                console.log(num_branches)
                
            // console.log(num_topics)
            // console.log(num_branches)

            setUserEnteredUrl(
                <div>
                <h1 style={{textAlign: "left"}}>{data['full_name']} Results</h1>
                <table class="table-auto">
                    <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Result</th>
                        <th>Recommendation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {checkNumStars(stargazers_count, num_stars_from_model)}
                    </tbody>
                </table>
                    <p style={{textAlign: "left"}}>{"Number of forks: " + data['forks_count']}</p>
                    <p style={{textAlign: "left"}}>{"Number of open issues: " + data['open_issues']}</p>
                    <p style={{textAlign: "left"}}>{"Number of watchers: " + data['watchers_count']}</p>
                    <p style={{textAlign: "left"}}>{"Number of topics: " + data['topics'].length}</p>
                    <p style={{textAlign: "left"}}>{"Number of branches: " + mydata.length}</p>
                </div>
                )
            });
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


import React, {useState} from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import APIService from '../../APIService/APIService'
import history from '../History/History'
import MakeAPiCalls from '../MakeApiCalls/MakeApiCalls'

//props of placeholder and repoUrl are passed to the component
const SearchBar = (props) => {
    var messageDict = {
        "Issues": {
            "exists": "Repo has issues!",
            "noExist": "Consider creating issues for code changes."
        },
        "Wiki": {
            "exists": "Repo has a wiki!",
            "noExist": "Consider adding a wiki to improve documentation."
        },
        "Pages": {
            "exists": "Repo has a pages site!",
            "noExist": "Consider adding a pages site to improve documentation."
        },
        "Overall": {
            "someComments": "Overall, with a few improvements, the maintainability and scalability of your repository can be improved!",
            "noComments": "Overall, your repository appears to have good documentation. More visibility into your project will hopefully come soon!"
        }
      };

    const [repoUrl, setRepoUrl] = useState("");
    const [userEnteredUrl, setUserEnteredUrl] = useState("");

    const handleRepoUrl = (event) => {
        console.log("handleRepoUrl function has been successfully ran!")
        const enteredUrl = event.target.value;
        setRepoUrl(enteredUrl);
        console.log(event);
    }
    
    const checkNumStars = (stargazers_count, num_stars_from_model) => {
        if (num_stars_from_model<stargazers_count) {
          return <tr>
                    <td className="text-center border-solid border-3 border-gray-github pt-6 pb-6">Stars Predicted / Actual Stars</td>
                    <td className="text-center bg-lime-300 border-solid border-3 border-gray-github pt-6 pb-6">{num_stars_from_model} / {stargazers_count}</td>
                    <td className="text-center bg-lime-300 border-solid border-3 border-gray-github pt-6 pb-6">Your repo is very popular!!</td>
                </tr>;
        } else {
          return <tr>
                    <td className="text-center border-solid border-3 border-gray-github pt-6 pb-6">Stars Predicted / Actual Stars</td>
                    <td className="text-center bg-yellow-300 border-solid border-3 border-gray-github pt-6 pb-6">{num_stars_from_model} / {stargazers_count}</td>
                    <td className="text-center bg-yellow-300 border-solid border-3 border-gray-github pt-6 pb-6">We were expecting more stars.</td>
                </tr>;
        }
      }
    
    const checkBoolOfRepo = (repo_bool, feature) => {
        if (repo_bool===true) {
            console.log("Below is repo_bool")
            console.log(repo_bool)
          return <tr>
                    <td className="text-center border-solid border-3 border-gray-github pt-6 pb-6">{feature}</td>
                    <td className="bg-lime-300 text-center border-solid border-3 border-gray-github pt-6 pb-6">{repo_bool.toString()}</td>
                    <td className="bg-lime-300 text-center border-solid border-3 border-gray-github pt-6 pb-6">{messageDict[feature]["exists"]}</td>
                </tr>;
        } else {
          return <tr>
                    <td className="text-center border-solid border-3 border-gray-github pt-6 pb-6">{feature}</td>
                    <td className="bg-yellow-300 text-center border-solid border-3 border-gray-github pt-6 pb-6">{repo_bool.toString()}</td>
                    <td className="bg-yellow-300 text-center border-solid border-3 border-gray-github pt-6 pb-6">{messageDict[feature]["noExist"]}</td>
                </tr>;
        }
      }
    
    const finalRecommendations = (has_issues, has_wiki, has_pages) => {
        if (has_issues === false || has_wiki === false || has_pages === false) {
          return <p className="text-center pt-4 font-semibold text-2xl">{messageDict["Overall"]["someComments"]}</p>;
        } else {
          return <p className="text-center pt-4 font-semibold text-2xl">{messageDict["Overall"]["noComments"]}</p>;
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
            console.log(data)
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
            let has_pages = data['has_pages']
            let repo_name = data['name']
            fetch(apiBranchesUrl)
            .then(res => res.json())
            .then(mydata => {
                let num_branches = mydata.length;
                let num_stars_from_model = 4634.716541*has_issues + -2568.089355*has_wiki + -1783.853471*has_projects +
                0.145594*forks_count + 3.807028*open_issues_count + 22.076769*subscribers_count + 346.543219*num_topics + 43.965901*num_branches
                num_stars_from_model = Math.round(num_stars_from_model)

            setUserEnteredUrl(
                <div className="justify-center">
                <h1 className="text-center pt-8">Respository name: {full_name}</h1>
                <div className="grid pr-14 pl-14">
                    <table className="table-auto justify-center">
                        <thead>
                            <tr>
                                <th className="text-center bg-gray-github text-white pr-14 pl-14 pt-6 pb-6 border-solid border-3 border-gray-github">Criteria</th>
                                <th className="text-center bg-gray-github text-white pr-14 pl-14 pt-6 pb-6 border-solid border-3 border-gray-github">Result</th>
                                <th className="text-center bg-gray-github text-white pr-14 pl-14 pt-6 pb-6 border-solid border-3 border-gray-github">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkNumStars(stargazers_count, num_stars_from_model)}
                            {checkBoolOfRepo(has_issues, 'Issues')}
                            {checkBoolOfRepo(has_wiki, 'Wiki')}
                            {checkBoolOfRepo(has_pages, 'Pages')}
                        </tbody>
                    </table>
                    {finalRecommendations(has_issues, has_wiki, has_pages)}
                </div>
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

        // setUserEnteredUrl(<p style={{textAlign: "left"}}>{userMessage}</p>)
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


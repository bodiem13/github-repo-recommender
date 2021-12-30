import React, {useState} from 'react'
//import {SearchBarStyling, search, searchIcon, searchInputs} from './SearchBarElements'
import './SearchBarElements.css'
//import SearchIcon from '@material-ui/icons/Search';
import { SearchIcon } from '@heroicons/react/solid'

//props of placeholder and repoUrl are passed to the component
const SearchBar = ({placeholder}) => {
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
        const userMessage = "The following user input has been handled: " + repoUrl
        setUserEnteredUrl(<p style={{textAlign: "left"}}>{userMessage}</p>)
    }
//     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//   <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
// </svg>
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//   </svg>
    return(
        <div className="search">
            <div className="searchInputs">
                {/*placeholder is being populated by the placeholder prop*/}
                <input type="text" value={repoUrl} placeholder={placeholder} onChange={handleRepoUrl}/>
                {/*Make SearchIcon a component for the import! */}
                <div className='button'>
                    <button type="submit" className="searchIcon" onClick={captureInput}><SearchIcon /></button>
                </div>
                {userEnteredUrl}
            </div>
        </div>
    );
};
export default SearchBar;
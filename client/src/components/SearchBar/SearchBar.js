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
    return(
        <div className="bg-gray-50 border-0 rounded text-base pl-2 pr-2 h-8 w-80">
            <div className="flex-1 mt-28">
                {/*placeholder is being populated by the placeholder prop*/}
                <input type="text" value={repoUrl} placeholder={placeholder} onChange={handleRepoUrl}/>
                {/*Make SearchIcon a component for the import! */}
                <div className="border-transparent">
                    <button type="submit" className="h-14 w-12 bg-white grid-flow-row focus:border-gray-700 place-items-center border-transparent cursor-pointer" onClick={captureInput}><SearchIcon /></button>
                </div>
                {userEnteredUrl}
            </div>
        </div>
    );
};
export default SearchBar;

// .search input {
//     background-color: white;
//     border: 0;
//     border-radius: 2px;
//     border-top-right-radius: 0px;
//     border-bottom-right-radius: 0px;
//     font-size: 18px;
//     padding: 15px;
//     height: 30px;
//     width: 300px;
//   }

// .searchIcon {
//     height: 60px;
//     width: 50px;
//     background-color: white;
//     display: grid;
//     place-items: center;
//     border: none;
//     cursor: pointer;
//   }
  
//   input:focus {
//     outline: none;
//   }
//   .searchIcon svg {
//     font-size: 35px;
//   }
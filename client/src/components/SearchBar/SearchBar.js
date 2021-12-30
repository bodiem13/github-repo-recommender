import React, {useState} from 'react'
//import {SearchBarStyling, search, searchIcon, searchInputs} from './SearchBarElements'
import './SearchBarElements.css'
import SearchIcon from '@material-ui/icons/Search';

//props of placeholder and repoUrl are passed to the component
const SearchBar = ({placeholder}) => {
    const [repoUrl, setRepoUrl] = useState("");
    // const []
    function captureInput() {
        console.log("Capture input function is being ran.");
    }

    const handleRepoUrl = (event) => {
        console.log("handleRepoUrl function has been successfully ran!")
        const enteredUrl = event.target.value;
        setRepoUrl(enteredUrl);
        console.log(event);
    }



    return(
        <div className="search">
            <div className="searchInputs">
                {/*placeholder is being populated by the placeholder prop*/}
                <input type="text" value={repoUrl} placeholder={placeholder} onChange={handleRepoUrl}/>
                {/*Make SearchIcon a component for the import! */}
                <div className='button'>
                    <button type="submit" className="searchIcon" onClick={captureInput}><SearchIcon /></button>
                </div>
            </div>
        </div>
    );
};
export default SearchBar;
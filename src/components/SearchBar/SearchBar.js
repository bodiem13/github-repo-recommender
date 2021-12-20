import React from 'react'
import {SearchBarStyling} from './SearchBarElements'

//props of repoUrl and getRepoDetails are passed to the component
const SearchBar = ({input:repoUrl, onChange:getRepoDetails}) => {
    function collectSearch(e){
        console.log("The collectSearch function is being ran")
    }

    return(
        <div>
            <form onSubmit={collectSearch}>
                <input 
                style={SearchBarStyling}
                key="foo"
                value={repoUrl}
                placeholder={"Enter GitHub Repository Link"}
                onChange={(e) => getRepoDetails(e.target.value)}
                />
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};
export default SearchBar;
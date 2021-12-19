import React from 'react'
import {SearchBarStyling} from './SearchBarElements'

const SearchBar = ({repoUrl, getRepoDetails}) => {
    return(
        <div>
            <input 
            style={SearchBarStyling}
            key="random1"
            value={repoUrl}
            placeholder={"Enter GitHub Repository Link"}
            onChange={(e) => getRepoDetails(e.target.value)}
            />
        </div>
    );
};
export default SearchBar;
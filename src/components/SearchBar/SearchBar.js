import React from 'react'
import {SearchBarStyling} from './SearchBarElements'

//props of repoUrl and getRepoDetails are passed to the component
const SearchBar = ({input:repoUrl, onChange:getRepoDetails}) => {
    return(
        <div>
            <input 
                style={SearchBarStyling}
                key="foo"
                value={repoUrl}
                placeholder={"Enter GitHub Repository Link"}
                onChange={(e) => getRepoDetails(e.target.value)}
            />
        </div>
    );
};
export default SearchBar;
import React from 'react'
//import {SearchBarStyling, search, searchIcon, searchInputs} from './SearchBarElements'
import './SearchBarElements.css'
import SearchIcon from '@material-ui/icons/Search';

//props of placeholder and repoUrl are passed to the component
const SearchBar = ({placeholder, repoUrl}) => {

    return(
        <div className="search">
            <div className="searchInputs">
                {/*placeholder is being populated by the placeholder prop*/}
                <input type="test" placeholder={placeholder}/>
                {/*Make SearchIcon a component for the import! */}
                <div className="searchIcon"><SearchIcon /></div>
            </div>
            <div className="dataResult"></div>
        </div>
    );
};
export default SearchBar;
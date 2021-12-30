import React, {useState} from 'react'
//import {SearchBarStyling, search, searchIcon, searchInputs} from './SearchBarElements'
import './SearchBarElements.css'
import SearchIcon from '@material-ui/icons/Search';

//props of placeholder and repoUrl are passed to the component
const SearchBar = ({placeholder, repoUrl}) => {
    const [filteredData, setFilteredData] = useState([]);



    return(
        <div className="search">
            <div className="searchInputs">
                {/*placeholder is being populated by the placeholder prop*/}
                <input type="test" placeholder={placeholder}/>
                {/*Make SearchIcon a component for the import! */}
                <div className='button'>
                    <button className="searchIcon"><SearchIcon /></button>
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    <h1>Filter is being ran</h1>
                </div>
                )
            }
        </div>
    );
};
export default SearchBar;
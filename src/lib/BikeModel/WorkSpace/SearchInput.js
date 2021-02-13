import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

function SearchInput(props) {
    return (
        <form className="bike__stations_search_form" style={{display: "flex", flexDirection: "row"}}>
            <label 
                style={{
                    alignItems: "center",
                    display: "flex"
                }}
            >
                <FontAwesomeIcon icon={faSearch} style={{marginLeft: "5px"}}/>
            </label>
            <input 
                type="text"
                style={{width: "100%"}}
                placeholder="Search Bike Station"
                onChange={(e) => props.searchHandler(e)}
                value={props.searchValue}
            >
            </input>
        </form>
    )
}

export default SearchInput
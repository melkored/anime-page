import React from 'react'
import SearchResults from "../container/searchResults"
import SearchHeader from "../container/searchHeader";
import DetailedContent from "../container/detailedContent";
import '../static/main.css'

let Main = () => (
    <div>
        <SearchHeader/>
        <div className={"all-content-bucket"}>
            <SearchResults/>
            <DetailedContent/>
        </div>
    </div>
);

export default Main
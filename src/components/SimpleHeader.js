import React from "react"
import { Link } from "gatsby";
import HeaderImages from "./HeaderImages";
import SearchHeader from "./SearchHeader";

export default () => (
    <div id="simple-header">
        <HeaderImages />
        <SearchHeader />
        <ul className="menu">
            <li><Link to="/">最新の日記</Link></li>
        </ul>
    </div>
);
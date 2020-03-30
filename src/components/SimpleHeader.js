import React from "react"
import { Link } from "gatsby";
import HeaderImages from "./HeaderImages";

export default () => (
    <div id="simple-header">
        <HeaderImages />
        <form method="get" action="/search" className="search-form">
            <input type="text" className="search-word" name="word" />
            <input type="submit" name=".searchword" value="検索" className="search-button" />
        </form>
        <ul className="menu">
            <li><Link to="/">トップ</Link></li>
            <li><Link to="/">最新の日記</Link></li>
        </ul>
    </div>
);
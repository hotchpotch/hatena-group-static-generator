import React from "react"
const SimpleHeader = () => (
    <div id="simple-header">
        <a href="http://www.hatena.ne.jp/">
            <img src="https://hatena.g.hatena.ne.jp/images/hatena-simple_de.gif" alt="Hatena::" title="Hatena::" id="logo-hatena" width={65} height={17} /></a><a href="http://g.hatena.ne.jp/">
            <img src="https://hatena.g.hatena.ne.jp/images/group-simple_de.gif" alt="Group" title="Group" id="logo-group" width={57} height={17} /></a><a href="/"><img border={0} src="https://hatena.g.hatena.ne.jp/images/group/hatena/hatena_slim_de.gif" id="log-group-name" height={17} alt="hatena" title="hatena" /></a>
        <form method="get" action="/search" className="search-form">
            <input type="text" className="search-word" name="word" />
            <input type="submit" name=".searchword" value="検索" className="search-button" />
        </form>
        <ul className="menu">
            <li><a href="/">トップ</a></li>
            <li><a href="/hatenagroup/">最新の日記</a></li>
            <li><a href="http://g.hatena.ne.jp/help">ヘルプ</a></li>
        </ul>
    </div>
);
export default SimpleHeader;
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

const SearchHeader = () => {
    const [query, setQuery] = useState(`github`)
    const [results, setResults] = useState([])

    useEffect(
        () => {
            if (!query || !window.__LUNR__) {
                setResults([])
                return
            }
            const lunrIndex = window.__LUNR__['ja']
            const searchResults = lunrIndex.index.search(query)
            setResults(
                searchResults.map(({ ref }) => {
                    return lunrIndex.store[ref]
                })
            )
        },
        [query]
    )

    let resultArea;
    if (results.length > 0) {
        resultArea = results.map(({ id, title }) => {
            return (
                <span className="site-generator--search-result-list" key={id}>
                    <Link to={'/' + id}>{title}</Link>
                </span>
            )
        })
    } else if (query) {
        resultArea = <p class="site-generator--search-result-not-found">タイトルからは見つかりませんでした</p>
    }

    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                method="get" action="/" className="search-form">
                <input
                    type='text'
                    className='search-word'
                    name='word'
                    defaultValue={query}
                    value={query}
                    onChange={event => {
                        setQuery(event.target.value)
                    }}
                />
                <input type="submit" name=".searchword" value="検索" className="search-button" />
                <input style={{ display: query ? 'inline' : 'none' }} onClick={() => setQuery('')} type="button" name="clear" value="クリア" className="search-button" />
            </form>
            {resultArea &&
                <div className="site-generator--search-result">
                    <p className="site-generator--search-result-message">
                        記事タイトルからの検索結果{query ? ' : ' + query : ''}
                    </p>
                    <div>
                        {resultArea}
                    </div>
                </div>
            }
        </>
    )
}

export default SearchHeader;
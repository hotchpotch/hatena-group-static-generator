
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

const Search = () => {
    const [query, setQuery] = useState(``)
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

    return (
        <div>
            <input
                type='text'
                defaultValue={query}
                onChange={event => {
                    setQuery(event.target.value)
                }}
            />
            {results.map(({ url, title, text }) => {
                return (
                    <div key={url}>
                        <h3>
                            <Link to={url}>{title}</Link>
                        </h3>
                        <p>{text}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Search
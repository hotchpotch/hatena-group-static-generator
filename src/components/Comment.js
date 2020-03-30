import React from "react"

export default ({ author, text, date }) => {
    const authorLink = `https://www.hatena.ne.jp/${author}/`;
    const authorImage = `https://www.hatena.ne.jp/users/${author.slice(0, 2)}/${author}/profile_s.gif`;
    return (
        <p>
            <span className="commentator">
                <a href={authorLink} className="hatena-id-icon">
                    <img src={authorImage} className="hatena-id-icon" alt={author} title={author} height="16" width="16" />{author}</a>
            </span>
            <span className="timestamp">
                <a href="#c">{date}</a>
            </span>
            <span className="commentbody">{text}</span>
        </p>
    );
}

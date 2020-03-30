import React from "react"
import { Link } from "gatsby"

import Comment from "../components/Comment"

export default ({ id, content, date, comments }) => {
    const commentsId = `comments-${id}`;
    return (
        <div className="day">
            <h2><Link to={`/${id}`}><span className="date">{date}</span></Link></h2>
            <div className="body" dangerouslySetInnerHTML={{ __html: content }} />

            <div className="comment" id={commentsId}>
                <div className="caption"><a href={"#" + commentsId}>コメントは書けません</a></div>
                <div class="commentshort">
                    {comments.map((comment, index) => <Comment key={index} {...comment} commentId={commentsId + '-' + index} />)}
                </div>
            </div>
        </div >
    )
}
import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import Comment from "../components/Comment"

export default ({ data }) => {
  const { id, content, title, date, comments } = data.hatenaGroupContent;
  const headTitle = `${title} - ${data.site.siteMetadata.title}`
  console.log(comments);

  return (
    <Layout>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>

      <div className="day">
        <h2><Link to={`/${id}`}><span className="date">{date}</span></Link></h2>
        <div className="body" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="comment">
          <div className="caption"><a href="#c">コメントは書けません</a></div>
          <div class="commentshort">
            {comments.map((comment, index) => <Comment key={index} {...comment} />)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    hatenaGroupContent(id: { eq: $id }) {
      id
      date(formatString: "YYYY-MM-DD")
      title
      content
      comments {
        author
        date(formatString: "YYYY-MM-DD HH:mm")
        text
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`
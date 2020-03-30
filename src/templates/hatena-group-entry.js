import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  const { id, content, title, date } = data.hatenaGroupContent;
  return (
    <Layout>
      <div className="day">
        <h2><Link to={`/${id}`}><span className="date">{date}</span></Link></h2>
        <div className="body" dangerouslySetInnerHTML={{ __html: content }} />

        <div className="comment">
          <div className="caption"><a href="#c">コメントは書けません</a></div>
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
    }
  }
`
import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  const { id, content, title, date } = data.hatenaGroupContent;
  return (
    <Layout>
      <div class="day">
        <h2><Link to={`/${id}`}><span class="date">{date}</span></Link></h2>
        <div class="body" dangerouslySetInnerHTML={{ __html: content }} />

        <div class="comment">
          <div class="caption"><a href="#c">コメントは書けません</a></div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    hatenaGroupContent(id: { eq: $id }) {
      id
      date(formatString: "YYYY-DD-MM")
      title
      content
    }
  }
`
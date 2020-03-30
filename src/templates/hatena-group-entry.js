import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

import Entry from "../components/Entry"
import Layout from "../components/Layout"

export default ({ data }) => {
  const { id, content, title, date, comments } = data.hatenaGroupContent;
  const headTitle = `${title} - ${data.site.siteMetadata.title}`

  return (
    <Layout>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      <Entry id={id} content={content} date={date} comments={comments} >
      </Entry>
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
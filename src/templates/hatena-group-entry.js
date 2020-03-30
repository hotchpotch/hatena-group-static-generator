import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

export default ({ data }) => {
  const html = data.hatenaGroupContent.content
  const title = data.hatenaGroupContent.title
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    hatenaGroupContent(id: { eq: $id }) {
      id
      date(formatString: "YYYYDDMM")
      title
      content
    }
  }
`
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import Entry from "../components/Entry";
import Helmet from "react-helmet";

export default ({ data }) => {
    return (
        <Layout>
            <Helmet>
                <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            {data.allHatenaGroupContent.edges.map(({ node }) =>
                <Entry key={node.id} {...node} />
            )}
        </Layout >
    )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allHatenaGroupContent(
        sort: { fields: [date], order: DESC },
        limit: $limit
        skip: $skip)
    {
        totalCount
        edges {
            node {
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
        }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`
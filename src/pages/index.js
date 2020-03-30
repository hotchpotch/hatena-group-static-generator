import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout";
import Entry from "../components/Entry";
import Helmet from "react-helmet";

export default () => {
    // XXX: limit のセット
    const data = useStaticQuery(graphql`
query {
    site {
      siteMetadata {
        title
      }
    }
    allHatenaGroupContent(sort: { fields: [date], order: DESC }, limit: 5) {
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
    }`);
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
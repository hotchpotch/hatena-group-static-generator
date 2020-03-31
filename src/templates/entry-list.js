import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import Entry from "../components/Entry";
import Helmet from "react-helmet";

function createPagination({ totalPageCount, currentPage, limit }) {
    const perPage = limit;
    const prev = {
        path: `/archives/${currentPage - 1}`,
        label: `前の${perPage}日分`,
    }
    const next = {
        path: `/archives/${currentPage + 1}`,
        label: `次の${perPage}日分`,
    }
    if (currentPage === totalPageCount) {
        return { prev }
    }
    if (currentPage === 1) {
        return { next }
    }
    return { next, prev }
}

export default ({ data, pageContext }) => {
    return (
        <Layout pagination={createPagination(pageContext)}>
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
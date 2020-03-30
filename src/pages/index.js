import React from "react"
import { Link, graphql } from "gatsby"

export default ({ data }) => {
    return (
        <div>
            <h1>
                SubTech
        </h1>
            <h4>{data.allHatenaGroupContent.totalCount} Posts</h4>
            {data.allHatenaGroupContent.edges.map(({ node }) => (
                <div key={node.id}>
                    <Link
                        to={"/" + node.id}
                    >
                        <h3
                        >
                            {node.title}{" "}
                            <span >
                                — {node.date}
                            </span>
                        </h3>
                        <p>{node.text.substring(0, 80)}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export const query = graphql`
query {
  allHatenaGroupContent(sort: { fields: [date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        date(formatString: "YYYYDDMM")
        title
        text
        content
      }
    }
  }
}
`
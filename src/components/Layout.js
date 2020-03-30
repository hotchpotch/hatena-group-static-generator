import React from "react"
import SimpleHeader from "./SimpleHeader";
import { useStaticQuery, Link, graphql } from "gatsby"

export default ({ children }) => {
    const data = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
    )
    return (
        <>
            <SimpleHeader />
            <div>
                <Link to={`/`}>
                    <h3>
                        {data.site.siteMetadata.title}
                    </h3>
                </Link>
                {children}
            </div>
        </>
    )
}
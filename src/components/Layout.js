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
            <h1>
                <Link to={`/`}>
                    {data.site.siteMetadata.title}
                </Link>
            </h1>
            <div className="hatena-body">
                <div className="calendar" id="pager-top">
                    <a rel="prev" href="/" className="prev">&lt;前の5日分</a><span id="edit-in-place-add"></span>
                </div>
                <div id="days">
                    {children}
                </div>
                <div className="calendar" id="pager-bottom">
                    <a rel="prev" href="/" className="prev">&lt;前の5日分</a>
                </div>
            </div>
        </>
    )
}
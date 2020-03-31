import React from "react"
import SimpleHeader from "./SimpleHeader";
import { useStaticQuery, Link, graphql } from "gatsby"

export default ({ children, pagination }) => {
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
    const { prev, next } = pagination || {};
    const pager = <>
        {prev &&
            <Link to={prev.path} className="prev">{"<" + prev.label}</Link>
        }
        {prev && next &&
            <span class="delimiter"> | </span>
        }
        {next &&
            <Link to={next.path} className="next">{next.label + ">"}</Link>
        }
    </>;
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
                    {pager}
                </div>
                <div id="days">
                    {children}
                </div>
                <div className="calendar" id="pager-bottom">
                    {pager}
                </div>
            </div>
        </>
    )
}
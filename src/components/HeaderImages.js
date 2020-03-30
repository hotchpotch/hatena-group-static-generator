import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

export default ({ children }) => {
    const data = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
              groupName
          }
        }
      }
    `
    )

    const { groupName } = data.site.siteMetadata;
    const groupImage = `https://hatena.g.hatena.ne.jp/images/group/${groupName}/${groupName}_slim_de.gif`;
    return <>
        <a href="http://www.hatena.ne.jp/">
            <img src="https://hatena.g.hatena.ne.jp/images/hatena-simple_de.gif" alt="Hatena::" title="Hatena::" id="logo-hatena" width={65} height={17} /></a><a href="http://g.hatena.ne.jp/">
            <img src="https://hatena.g.hatena.ne.jp/images/group-simple_de.gif" alt="Group" title="Group" id="logo-group" width={57} height={17} /></a><Link href="/">
            <img border={0} src={groupImage} id="log-group-name" height={17} alt={groupName} title={groupName} /></Link>
    </>;
}
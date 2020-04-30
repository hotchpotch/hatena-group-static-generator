/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const siteSettings = require("./site-settings")

module.exports = {
  siteMetadata: {
    title: siteSettings.blogTitle,
    groupName: siteSettings.groupName,
    siteUrl: siteSettings.siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        //        isTSX: true, // defaults to false
        // jsxPragma: `jsx`, // defaults to "React"
        // allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/hatena-group-exports/`,
        name: `hatena-group`,
      },
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            name: "ja",
          },
        ],
        fields: [
          { name: "title", store: true, attributes: { boost: 10 } },
          // { name: 'text', store: false },
          { name: "id", store: true },
        ],
        resolvers: {
          HatenaGroupContent: {
            title: node => node.title,
            // テキストを全文検索するとファイルが巨大になるので利用しない
            // text: node => node.searchText,
            id: node => node.id,
          },
        },
        filename: "search_index.json",
        fetchOptions: {
          credentials: "same-origin",
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    "gatsby-plugin-eslint",
  ],
}

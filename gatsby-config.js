/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `#生存戦略、それは`,
    groupName: 'subtech',
  },
  plugins: [
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
            name: 'ja',
          },
        ],
        fields: [
          { name: 'title', store: true, attributes: { boost: 10 } },
          // { name: 'text', store: false },
          { name: 'url', store: true },
        ],
        resolvers: {
          HatenaGroupContent: {
            title: node => node.title,
            // テキストを全文検索するとファイルが巨大になるので利用しない
            // text: node => node.searchText,
            url: node => '/' + node.id,
          },
        },
        filename: 'search_index.json',
        fetchOptions: {
          credentials: 'same-origin'
        },
      },
    },
    'gatsby-plugin-eslint',
    `gatsby-plugin-react-helmet`,
  ]
}

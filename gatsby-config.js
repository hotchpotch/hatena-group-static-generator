/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Hatena::Group::SubTech id:secondlife`,
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
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'content', store: true },
          { id: 'id', store: true },
        ],
        resolvers: {
          HatenaGroupContent: {
            title: node => node.title,
            content: node => node.text,
            id: node => node.id,
          },
        },
        //custom index file name, default is search_index.json
        filename: 'search_index.json',
        //custom options on fetch api call for search_ındex.json
        fetchOptions: {
          credentials: 'same-origin'
        },
      },
    },
    'gatsby-plugin-eslint',
    `gatsby-plugin-react-helmet`,
  ]
}
